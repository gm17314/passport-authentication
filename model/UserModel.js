const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

//Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
});

UserSchema.plugin(passportLocalMongoose);

//Model
const UserModel = mongoose.model("User",UserSchema);

module.exports = UserModel;
