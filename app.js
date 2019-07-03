var express = require('express');
var app = express();
var db = require('./db');
var cors = require('cors');

app.use(cors());

var SignupController = require('./signup/signupController');
app.use('/signup', SignupController);

var SigninController = require('./signin/signinController');
app.use('/signin', SigninController);

var orderController = require('./orders/orderController');
app.use('/order', orderController);

app.use('/', express.static(require('path').join(__dirname, 'public')));

var ProfileController = require('./userprofile/userprofileController');
app.use('/profile', ProfileController);




module.exports = app;