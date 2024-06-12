"use strict";

const sequelize = require("../config/connection");
const { Item, Image } = require("../models");

async function getNFreeItems(n) {
  try {
    const freeItemsData = await Item.findAll({
      attributes: ["id", "title", "created_at"],
      where: { price: 0 },
      order: [["created_at", "DESC"]],
      limit: n,
      include: [{ model: Image, attributes: ["id"] }],
    });
    return freeItemsData.map((item) => item.get({ plain: true }));
  } catch (err) {
    console.error(err);
  }
}

async function searchItems(searchParams) {
  const { term, lat, lng, radius } = searchParams;
  try {
    const result = await sequelize.query(
      `
        select distinct item.id , title,description,phone_email,price,item.username,address, image.id as image_id,ST_Distance(
           geo_location, 
           ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)
         )  AS distance
        from item inner join users on item.username = users.username
            inner join image on item.id = image.item_id
  
        where 	title ilike '%${term}%' and
              ST_Distance(
           geo_location, 
           ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)
          )  < ${radius};	
        `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    // reduce the result to group by item
    const groupedResult = result.reduce((acc, curr) => {
      const found = acc.find((item) => item.id === curr.id);
      if (!found) {
        acc.push({
          id: curr.id,
          title: curr.title,
          description: curr.description,
          phone_email: curr.phone_email,
          price: curr.price,
          username: curr.username,
          address: curr.address,
          images: [{ id: curr.image_id }],
          distance: (curr.distance / 1000).toFixed(2),
        });
      } else {
        found.images.push({ id: curr.image_id });
      }
      return acc;
    }, []);

    return groupedResult;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getNFreeItems, searchItems };