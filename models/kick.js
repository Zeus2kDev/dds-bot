const mongoose = require("mongoose");

const kickSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    server: String,
    username: String,
    userID: String,
    reason: String,
    kUsername: String,
    kID: String,
    time: String
});

module.exports = mongoose.model("Kick", kickSchema);
