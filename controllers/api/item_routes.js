const router = require("express").Router();
const { Category, Item, Image } = require("../../models");
const Query = require("../../models/queries");
const multer = require("multer");
const withAuth = require("../../utils/auth_middleware");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { files: 3 },
});

<<<<<<< HEAD
// search based on term and location
// query: /api/item/term_location?term=term&lat=lat&lng=lng&radius=radius
router.get("/search/term_location", async (req, res) => {
  try {
    const items = await Query.searchItemsByTerm(req.query);
    const categories = await Category.getCategories();
    const data = {
      items,
      categories,
      term: req.query.term,
      radius: req.query.radius / 1000,
      username: req.session.username,
    };
    data.radius = data.radius < 1000 ? data.radius + " km radius" : "Anywhere";
    res.render("search_result", { data });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// search based on category
// query: /api/item/search/category?category=category&lat=lat&lng=lng&radius=radius
router.get("/search/category/", async (req, res) => {
  try {
    const items = await Query.searchItemsByCategory(req.query);
    const categories = await Category.getCategories();
    const data = {
      items,
      categories,
      term: req.query.term,
      radius: req.query.radius / 1000,
      username: req.session.username,
      category: req.query.category,
    };
    data.radius = data.radius < 1000 ? data.radius + " km radius" : "Anywhere";
    res.render("search_result", { data });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// search based on item id
// query: /api/item/search/category?id=id&lat=lat&lng=lng&radius=radius
router.get("/search/id", async (req, res) => {
  try {
    let item = (await Query.searchItemsById(req.query))[0];
    // Add index to images for carousel
    item.images = item.images.map((image, index) => {
      return {
        id: image.id,
        index: index,
      };
    });

    const data = { item, username: req.session.username };
    res.render("item_details", { data });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// add items
router.post("/", upload.array("images", 3), async (req, res) => {
=======
//add items
router.post("/", withAuth, upload.array("images", 3), async (req, res) => {
>>>>>>> b6288fb2d51f3aa1e5b783ddbf13292c23c6e92d
  try {
    const newItem = await Item.create(req.body);

    if (req.files) {
      for (const newFile of req.files) {
        await Image.create({
          item_id: newItem.id,
          image: newFile.buffer,
        });
      }
    }
    res.status(200).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

<<<<<<< HEAD
// update items
router.put("/:id", upload.array("images", 3), async (req, res) => {
=======
//update items
router.put("/:id", withAuth, upload.array("images", 3), async (req, res) => {
  //logic for updating items
>>>>>>> b6288fb2d51f3aa1e5b783ddbf13292c23c6e92d
  try {
    const updateItems = await Item.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.files) {
      for (const newFile of req.files) {
        await Image.create({
          item_id: req.params.id,
          image: newFile.buffer,
        });
      }
    }

    res.status(200).json(updateItems);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

<<<<<<< HEAD
// delete items
router.delete("/:id", async (req, res) => {
=======
//delete items
router.delete("/:id", withAuth, async (req, res) => {
>>>>>>> b6288fb2d51f3aa1e5b783ddbf13292c23c6e92d
  try {
    const deletedItem = await Item.destroy({
      where: {
        id: req.params.id,
      },
    });

    await Image.destroy({
      where: {
        item_id: req.params.id,
      },
    });

    res.status(200).json(deletedItem);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
