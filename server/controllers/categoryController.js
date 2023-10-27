const { Category } = require('../models/category');

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.createCategory = async (req, res) => {
  const newCategory = new Category(req.body);
  const category = await newCategory.save();
  res.json(category);
};

exports.getCategoryCount = async (req, res) => {
    const count = await Category.countDocuments();
    res.json(count);
};  

// Add the rest of the CRUD operations' controllers here

module.exports = exports;
