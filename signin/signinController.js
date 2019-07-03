var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Signin = require('./signin');

// RETURNS ALL THE USERS IN THE DATABASE
router.post('/', function (req, res) {
    Signin.findOne({ username: req.body.username, password: req.body.password }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send(
            {
                login: {
                    userinfo: "",
                    message: "No user found.",
                    servicestatus: "Success"
                }
            });
        res.status(200).send({
            login: {
                userinfo: {
                    username: user.username,
                    password: user.password,
                    userid: user._id
                },
                message: "Signin Success...!",
                servicestatus: "Success"
            }

        });
    });
});


module.exports = router;