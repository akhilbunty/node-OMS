var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    userid: String,
    firstname: String,
    lastname: String,
    email: String,
    gender: String,
    phoneno: Number,
    address: String,
    profilepic: String
}, { versionKey: false });
mongoose.model('Userprofile', UserSchema);

module.exports = mongoose.model('Userprofile');