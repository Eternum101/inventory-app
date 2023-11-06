const { Item } = require('../models/items');

exports.getAllItems = async (req, res) => {
  const pageNo = parseInt(req.query.pageNo);
  const size = parseInt(req.query.size);
  const query = {};
  if (pageNo < 0 || pageNo === 0) {
    response = { "error": true, "message": "invalid page number, should start with 1" };
    return res.json(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;
  // Find some items with pagination
  try {
    const data = await Item.find({}, {}, query);
    response = { "error": false, "message": data };
  } catch (err) {
    response = { "error": true, "message": "Error fetching data" };
  }
  res.json(response);
};

exports.getItemById = async (req, res) => {
  const id = req.params.id;
  const item = await Item.findById(id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
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
