const { Item, Category } = require('../models');

exports.listItems = async (req, res) => {
  try {
    const items = await Item.findAll({ include: 'category' });
    res.render('items/listItems', { items });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.addItemForm = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render('items/addItem', { categories });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.addItem = async (req, res) => {
  try {
    const { name, description, price, location, categoryId } = req.body;
    await Item.create({ name, description, price, location, categoryId, userId: req.session.userId });
    res.redirect('/items');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.listFreeItems = async (req, res) => {
  try {
    const freeItems = await Item.getNFreeItems(10);  // Get the 10 most recent free items
    res.render('items/listFreeItems', { freeItems });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Item.destroy({ where: { id } });
    res.render('items/deleteSuccess', { itemDeleted: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
  

  exports.editItemForm = async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findByPk(id);
      const categories = await Category.findAll();
      res.render('items/editItem', { item, categories });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
  
  exports.editItem = async (req, res) => {
    try {
      const { id } = req.params;
      const { username, cat_name, title, description, price } = req.body;
      await Item.update({ username, cat_name, title, description, price, created_at }, { where: { id } });
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
