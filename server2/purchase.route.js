const express = require('express');
const purchaseProductRoutes = express.Router();

let PurchaseProduct = require('./purchase.model')

purchaseProductRoutes.route('/purchaseAdd').post(function (req, res) {
    let purchaseProduct = new PurchaseProduct(req.body);
    purchaseProduct.save()
        .then(purchaseProduct => {
            res.status(200).json({'PurchaseProduct': 'PurchaseProduct in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});
// Defined get data(index or listing) route
purchaseProductRoutes.route('/purchase').get(function (req, res) {
    PurchaseProduct.find(function(err, purchaseProducts){
        if(err){
            console.log(err);
        }
        else {
            res.json(purchaseProducts);
        }
    });
});


module.exports = purchaseProductRoutes;