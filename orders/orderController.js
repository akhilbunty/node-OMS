var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var order = require('./order');

router.get('/', function (req, res) {
    order.find({}, function (err, orders) {
        if (err) return res.status(500).send("There was a problem finding the data.");
        res.status(200).send({
            getorders: {
                ordersinfo: orders,
                message: "Data fetched successfully...!",
                servicestatus: "Success"
            }
        });
    });
});

router.get('/:id', function (req, res) {
    order.findById(req.params.id, function (err, orders) {
        if (err) return res.status(500).send("There was a problem finding the data.");
        if (!orders) return res.status(404).send("No Record found.");
        res.status(200).send({
            getorders: {
                ordersinfo: orders,
                message: "Data fetched successfully...!",
                servicestatus: "Success"
            }
        });
    });
});

// CREATES A NEW USER
router.post('/', function (req, res) {
    // var indiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    // var today = new Date(indiaTime).toLocaleString();
    // console.log("47", today, req.body);
    order.create({
        order_due_date: req.body.date.year + "-" + req.body.date.month + "-" + req.body.date.day, //req.body.date,'2002-12-09'
        customer_buyer_name: req.body.customername,
        customer_address: req.body.customeraddress,
        customer_phone: req.body.customerphone,
        order_total: req.body.ordertotal,
    },
        function (err, orders) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send({
                getorders: {
                    ordersinfo: orders,
                    message: "Data fetched successfully...!",
                    servicestatus: "Success"
                }
            });
        });
});

router.put('/:id', function (req, res) {
    let body = {
        order_due_date: req.body.date.year + "-" + req.body.date.month + "-" + req.body.date.day, //req.body.date,'2002-12-09'
        customer_buyer_name: req.body.customername,
        customer_address: req.body.customeraddress,
        customer_phone: req.body.customerphone,
        order_total: req.body.ordertotal,
        _id: req.body._id
    }
    console.log(body)
    order.findByIdAndUpdate(req.params.id, body, { new: true }, function (err, orders) {
        if (err) return res.status(500).send("There was a problem finding the data. put");
        if (!orders) return res.status(404).send("No Record found.");
        res.status(200).send({
            getorders: {
                ordersinfo: orders,
                message: "Data fetched successfully...!",
                servicestatus: "Success"
            }
        });
    });
});

router.delete('/:id', function (req, res) {
    order.findByIdAndRemove(req.params.id, function (err, orders) {
        if (err) return res.status(500).send("There was a problem in deleting the data.");
        if (!orders) return res.status(404).send("No Record found to delete.");
        res.status(200).send({
            getorders: {
                message: "Record deleted successfully...!",
                servicestatus: "Success"
            }
        });
    });
});


module.exports = router;