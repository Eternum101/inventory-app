const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.get('/count', categoryController.getCategoryCount);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);

module.exports = router;
