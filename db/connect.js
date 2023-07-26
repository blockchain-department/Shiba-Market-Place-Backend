const mongoose = require("mongoose");
const dotenv = require('dotenv');

// uri = "mongodb+srv://muzammillone07:QCZQnZpSUfzr1Ltb@testapi.n5h0keb.mongodb.net/testApi?retryWrites=true&w=majority"
const connectDB = (uri) => {
    console.log(uri);
    console.log('connecting to database.....');
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
};

module.exports = connectDB;