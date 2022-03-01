const express = require('express');
const createProductRoutes = express.Router();

// Require Business model in our routes module
let CreateProduct = require('./create.model');
// Defined store route
createProductRoutes.route('/add').post(function (req, res) {
    let createProduct = new CreateProduct(req.body);
    createProduct.save()
        .then(createProduct => {
            res.status(200).json({'CreateProduct': 'CreateProduct in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});
// Defined get data(index or listing) route
createProductRoutes.route('/').get(function (req, res) {
    CreateProduct.find(function(err, createProducts){
        if(err){
            console.log(err);
        }
        else {
            res.json(createProducts);
        }
    });
});


module.exports = createProductRoutes;