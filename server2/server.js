const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
// const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const createProductsRoute = require('./create.route');
const purchaseProductsRoute = require('./purchase.route');
// const accountProductsRoute = require('./account.route');
// const fs = require('fs');
// const dbName = 'testDB';
// const client = new MongoClient(config.DB, { useUnifiedTopology:true });
// client.connect(function(err) {
//     //assert.equal(null, err);
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);

//     getDocuments(db, function(docs) {
    
//         console.log('Closing connection.');
//         client.close();
        
//         // Write to file
//         try {
//             fs.writeFileSync('createProducts.json', JSON.stringify(docs));
//             console.log('Done writing to file.');
//         }
//         catch(err) {
//             console.log('Error writing to file', err)
//         }
//     });
// })
// const getDocuments = function(db, callback) {
//     const query = { };  // this is your query criteria
//     db.collection("createProducts")
//       .find(query)
//       .toArray(function(err, result) { 
//           if (err) throw err; 
//           callback(result); 
//     }); 
// };
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/createProducts', createProductsRoute);
app.use('/purchaseProduct', purchaseProductsRoute);
// app.use('/accountProduct', accountProductsRoute);
app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});



