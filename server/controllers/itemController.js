const { Item } = require('../models/items');

exports.getAllItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

exports.createItem = async (req, res) => {
  const newItem = new Item(req.body);
  const item = await newItem.save();
  res.json(item);
};

exports.getItemCount = async (req, res) => {
  const count = await Item.countDocuments();
  res.json(count);
};

exports.updateItem = async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json({ message: 'Item deleted successfully' });
};

// Add the rest of the CRUD operations' controllers here

module.exports = exports;
