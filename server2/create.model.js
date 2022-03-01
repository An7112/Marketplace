const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let CreateProducts = new Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
}, {
    collection: 'createProducts'
});

module.exports = mongoose.model('CreateProducts', CreateProducts);