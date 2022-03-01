const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let CreateProducts = new Schema({
    account: {
        type: String
    }
}, {
    collection: 'createProducts'
});

module.exports = mongoose.model('CreateProducts', CreateProducts);