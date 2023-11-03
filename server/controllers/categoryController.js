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

exports.getCategoryById = async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json(category);
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!category) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  try {
      const category = await Category.findByIdAndDelete(req.params.id);

      if (!category) return res.status(404).json({ message: 'Category not found' });
      res.json(category);
  } catch (error) {
      res.status(500).json({ message: 'There was an error!', error });
  }
};

// Add the rest of the CRUD operations' controllers here

module.exports = exports;
