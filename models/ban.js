const mongoose = require("mongoose");

const banSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    server: String,
    username: String,
    userID: String,
    reason: String,
    bUsername: String,
    bID: String,
    time: String
});

module.exports = mongoose.model("Ban", banSchema);
