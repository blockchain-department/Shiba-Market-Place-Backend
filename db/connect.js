const mongoose = require("mongoose");
const dotenv = require('dotenv');
const connectDB = (uri) => {
    console.log(uri);
    console.log('connecting to database.....');
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbname : "Nfts"});
};

module.exports = connectDB;