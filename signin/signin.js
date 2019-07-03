var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  username: String,
  password: String
}, { versionKey: false });
mongoose.model('Users', UserSchema);

module.exports = mongoose.model('Users');