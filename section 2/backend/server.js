const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const PRODUCTS_FILE = './products.json';
const ARTISANS_FILE = './artisans.json';

// Load data from files if exist
let products = [];
let artisans = [];
if (fs.existsSync(PRODUCTS_FILE)) {
  products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
}
if (fs.existsSync(ARTISANS_FILE)) {
  artisans = JSON.parse(fs.readFileSync(ARTISANS_FILE, 'utf-8'));
}

// Save data to file helper
function saveProducts() {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}
function saveArtisans() {
  fs.writeFileSync(ARTISANS_FILE, JSON.stringify(artisans, null, 2));
}

// Products endpoints
app.get('/api/products', (req, res) => res.json(products));
app.post('/api/products', (req, res) => {
  products.push(req.body);
  saveProducts();
  res.status(201).json({ message: 'Product added' });
});

// Artisans endpoints
app.get('/api/artisans', (req, res) => res.json(artisans));
app.post('/api/artisans', (req, res) => {
  artisans.push(req.body);
  saveArtisans();
  res.status(201).json({ message: 'Artisan added' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Fetch products
useEffect(() => {
  fetch('http://localhost:5000/api/products')
    .then(res => res.json())
    .then(setProducts);
}, []);

// Add product
const addProduct = (product) => {
  fetch('http://localhost:5000/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  }).then(() => {
    // Refresh product list
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(setProducts);
  });
};