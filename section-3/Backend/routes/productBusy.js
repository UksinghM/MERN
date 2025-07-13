const express = require('express');
const router = express.Router();
const ProductBusy = require('../models/ProductBusy');

router.post('/', async (req, res) => {
  try {
    const { productId, name, phone, address, busyTime } = req.body;
    const busy = new ProductBusy({ productId, name, phone, address, busyTime });
    await busy.save();
    res.status(201).json(busy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all busy products
router.get('/', async (req, res) => {
  try {
    const allBusy = await ProductBusy.find().sort({ createdAt: -1 });
    res.json(allBusy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;