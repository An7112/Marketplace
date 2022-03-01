
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PurchaseProducts = new Schema({
id: {
    type: Number
},
name: {
    type: String
},
owner: {
    type: String
},
price: {
    type: String
},
purchased: {
    type: Boolean
},}, {
    collection: 'purchaseProduct'
});
module.exports = mongoose.model('PurchaseProducts', PurchaseProducts);
//purchaseProduct