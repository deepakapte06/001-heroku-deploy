const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
//destruted to the following. ... the two are same.
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
});

//creating a new / definging (if already exist) mongoose model.
mongoose.model("users", userSchema);
