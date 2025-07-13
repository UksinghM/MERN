const mongoose = require('mongoose');

const productBusySchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  busyTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProductBusy', productBusySchema);