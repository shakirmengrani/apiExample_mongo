var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  created_at: {type:Date,default:Date.now}
});


var postSchema = new mongoose.Schema({
  title: String,
  text: String,
  created_by: String,
  created_at: {type:Date,default:Date.now}
});


mongoose.model("users",userSchema);
mongoose.model("posts",postSchema);
