const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  })

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;