const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
//destruted to the following. ... the two are same.
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
});

//creating a new / definging (if already exist) mongoose model.
mongoose.model("users", userSchema);
