var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  username: String,
  password: String
}, { versionKey: false });
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');