const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    numberInStock: Number,
    url: String
});

const Item = mongoose.model('Item', itemSchema);

module.exports = { Item }; 