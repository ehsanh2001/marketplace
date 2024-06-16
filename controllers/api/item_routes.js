const express = require('express');
const router = express.Router();
const itemController = require('../item');

router.get('/', itemController.listItems);
router.get('/add', itemController.addItemForm);
router.post('/add', itemController.addItem);
router.get('/free', itemController.listFreeItems);  // Route for free items
router.get('/edit/:id', itemController.editItemForm);  // Route for editing an item
router.post('/edit/:id', itemController.editItem);     // Route for submitting the edit
router.get('/delete/:id', itemController.deleteItem);  // Route for deleting an item


module.exports = router;
