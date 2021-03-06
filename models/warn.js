const mongoose = require("mongoose");

const warnSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    server: String,
    username: String,
    userID: String,
    reason: String,
    wUsername: String,
    wID: String,
    time: String
});

module.exports = mongoose.model("Warn", warnSchema);
