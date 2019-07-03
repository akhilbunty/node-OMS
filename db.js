var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/OMS');


var signin = require('./signin/signin');
var logins = [
    { "username": "akhil", "password": "akhil" },
    { "username": "navtech", "password": "navtech"  },
];
for (let index = 0; index < logins.length; index++) {
    signin.find({ username: logins[index].username }, function (err, user) {
        if (err) return res.status(500).send("There was a problem adding the data in logins.");
        if (user.length != 0) {
            // console.log("logins exits");
        } else {
            signin.collection.insertOne(logins[index], function (err, res) {
                // if (err) return res.status(500).send("There was a problem finding the data.");
                // console.log(res);
                // console.log("district added");
            })
        }
    });
}