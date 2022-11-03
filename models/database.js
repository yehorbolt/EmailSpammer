const mongoose = require('mongoose')
require('dotenv/config')

mongoose.connect(process.env.DB_CONNECTION)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error message: "));
db.once("open", function () {
    console.log("Connected successfully");
});

require('./user.scheme.model')