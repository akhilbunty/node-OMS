var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Signup = require('./signup');
var Profile = require('../userprofile/userprofile');

// CREATES A NEW USER
router.post('/', function (req, res) {
    Signup.findOne({ username: req.body.username }, function (err, user) {
        if (err) return res.status(500).send("There was a problem creating the user.");
        if (!user) {
            Signup.create({
                username: req.body.username,
                password: req.body.password
            },
                function (err, user) {
                    if (err) return res.status(500).send("There was a problem adding the information to the database.");
                    if (user) {
                        Profile.create({
                            userid: user._id,
                            firstname: user.username,
                            lastname: "",
                            email: "",
                            gender: "",
                            phoneno: null,
                            address: "",
                            profilepic: ""
                        },
                            function (err, Profile) {
                                if (err) return res.status(500).send("There was a problem adding the profile information to the database.");
                                res.status(200).send({
                                    signup: {
                                        userinfo: {
                                            username: user.username,
                                            password: user.password,
                                            userid: user._id
                                        },
                                        message: "Signup Success...!",
                                        servicestatus: "Success"
                                    }
                                });
                            });
                    }
                });
        }
        else {
            res.status(200).send({
                signup: {
                    userinfo: "",
                    message: "User Already Exists",
                    servicestatus: "Success"
                }
            })
        }
    });
});

module.exports = router;