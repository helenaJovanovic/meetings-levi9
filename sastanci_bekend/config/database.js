const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log("Connection to database failed");
        console.error(error);
        process.exit(1);
    })
}