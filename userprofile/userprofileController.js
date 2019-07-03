var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Profile = require('./userprofile');

router.get('/', function (req, res) {
    Profile.find({}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the data.");
        res.status(200).send({
            profile: {
                info: user,
                message: "Data fetched successfully...!",
                servicestatus: "Success"
            }
        });
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    Profile.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the data.");
        if (!user) return res.status(404).send("No Record found.");
        res.status(200).send({
            profile: {
                info: user,
                message: "Profile data fetched successfully...!",
                servicestatus: "Success"
            }
        });
    });
});


// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    Profile.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the data.");
        res.status(200).send({
            profile: {
                info: user,
                message: "Profile data updated successfully...!",
                servicestatus: "Success"
            }
        });
    });
});


module.exports = router;