const mongoose = require("mongoose");

const jwtSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    token: { type: String, required: true, index: true, unique: true },
});

module.exports = mongoose.model("RefreshToken", jwtSchema);
