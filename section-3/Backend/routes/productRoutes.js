const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { adminOnly } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Example: Only admin can delete a product
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Example: Only admin can add a product
router.post('/', adminOnly, async (req, res) => {
  const prod = new Product(req.body);
  await prod.save();
  res.json(prod);
});

module.exports = router;