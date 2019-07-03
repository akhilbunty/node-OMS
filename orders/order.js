var mongoose = require('mongoose');
var orderSchema = new mongoose.Schema({
    order_due_date: Date,
    customer_buyer_name: String,
    customer_address: String,
    customer_phone: Number,
    order_total: Number
}, { versionKey: false });
mongoose.model('order', orderSchema);

module.exports = mongoose.model('order');