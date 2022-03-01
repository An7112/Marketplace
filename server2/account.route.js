const express = require('express');
const accountProductRoutes = express.Router();

// Require Business model in our routes module
let AccountProduct = require('./account.model');
// Defined store route
accountProductRoutes.route('/account').post(function (req, res) {
    let accountProduct = new AccountProduct(req.body);
    accountProduct.save()
        .then(accountProduct => {
            res.status(200).json({'AccountProduct': 'AccountProduct in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});
// Defined get data(index or listing) route
accountProductRoutes.route('/listaccount').get(function (req, res) {
    AccountProduct.find(function(err, accountProducts){
        if(err){
            console.log(err);
        }
        else {
            res.json(accountProducts);
        }
    });
});


module.exports = accountProductRoutes;