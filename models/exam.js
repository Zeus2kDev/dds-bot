const mongoose = require("mongoose");

const examSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    server: String,
    username: String,
    userID: String,
    time: String
});

module.exports = mongoose.model("Exam", examSchema);
