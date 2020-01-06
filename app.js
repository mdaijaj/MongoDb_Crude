const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set up mongoose connection
const mongoose = require('mongoose');
var db_url = 'mongodb://localhost:27017/mydb';

//mongo db connect 
const mongoDB = process.env.MONGODB_URI || db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Imports routes for the products
const product = require('./routes/product.routes.js'); 
app.use('/products', product);

let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ', port);
});