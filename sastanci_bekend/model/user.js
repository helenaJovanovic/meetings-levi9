const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Username: {type: String, unique: true},
    FirstName: {type: String, default: null},
    LastName: {type: String, default:null},
    Email: {type: String, unique: true}
});

module.exports = mongoose.model("user", userSchema);
