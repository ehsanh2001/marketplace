"use strict";

const { Category, User, Item, Image } = require("../models");
const fs = require("fs");
const path = require("path");
const usersData = require("./users.json");
const itemsData = require("./items.json");
const { min } = require("../models/category");

async function seedCategory() {
  try {
    // Get the list of image files from a directory
    const imageDirectory = "./seeds/category-image";
    const imageFiles = fs.readdirSync(imageDirectory);

    // Iterate through each image file
    for (const imageFile of imageFiles) {
      // Read the image file as binary data
      const imagePath = path.join(imageDirectory, imageFile);
      const imageBinaryData = fs.readFileSync(imagePath);

      // Create a record in the database
      await Category.create({
        name: imageFile.split(".")[0], // Assuming the image filename as the name
        image: imageBinaryData, // Store the binary data of the image
      });

      console.log(`Image ${imageFile} seeded successfully.`);
    }

    console.log("All images seeded successfully.");
  } catch (error) {
    console.error("Error seeding images:", error);
  }
}

async function seedUsers() {
  try {
    for (const userData of usersData) {
      await User.create(userData);
    }
    console.log("Users seeded successfully.");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

async function seedItems() {
  try {
    for (const itemData of itemsData) {
      await Item.create(itemData);
    }
    console.log("Items seeded successfully.");
  } catch (error) {
    console.error("Error seeding items:", error);
  }
}

async function seedImages() {
  const randomNumber = (n, m) => Math.floor(Math.random() * (m - n + 1)) + n;
  try {
    // Get the list of image files from a directory
    const imageDirectory = "./seeds/category-image";
    const imageFiles = fs.readdirSync(imageDirectory);

    // Iterate through each image file
    const imagesBinaryData = [];
    for (const imageFile of imageFiles) {
      // Read the image file as binary data
      const imagePath = path.join(imageDirectory, imageFile);
      const imageBinaryData = fs.readFileSync(imagePath);
      imagesBinaryData.push(imageBinaryData);
    }

    // seeding images
    const minID = await Item.min("id");
    const maxID = await Item.max("id");

    let id = minID;
    while (id <= maxID) {
      for (let i = 0; i < 3; i++) {
        const imageBinaryData =
          imagesBinaryData[randomNumber(0, imagesBinaryData.length - 1)];

        try {
          await Image.create({
            item_id: id,
            image: imageBinaryData,
          });
        } catch (error) {
          continue;
        }
      }
      id++;
    }
  } catch (error) {
    console.error("Error seeding images:", error);
  }
}

async function seed() {
  await seedCategory();
  await seedUsers();
  await seedItems();
  await seedImages();
}

seed();
