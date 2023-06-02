const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  isAvatarImagesSet: {
    type: Boolean,
    default: false,
  },
  avatarImages: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Users", userSchema);
