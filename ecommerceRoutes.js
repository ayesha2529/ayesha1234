
const express = require('express');
const router = express.Router();

// Middleware for logging
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);
  next();
};

// Middleware for authentication
const authenticateUser = (req, res, next) => {
  const isLoggedIn = true; 
  if (isLoggedIn) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.status(401).send('Unauthorized. Please log in.');
  }
};

//Database
const products = [
  { id: 1, name: 'Product 1', price: 25 },
  { id: 2, name: 'Product 2', price: 30 },
  { id: 3, name: 'Product 3', price: 40 }
];

// End point for displaying products
router.get('/products', (req, res) => {
  res.json(products);
});

// End point for adding a product to the cart
router.post('/cart/add/:productId', authenticateUser, (req, res) => {
  const productId = parseInt(req.params.productId);
  const selectedProduct = products.find(product => product.id === productId);
  if (selectedProduct) {
    
    res.send(`Added ${selectedProduct.name} to the cart.`);
  } else {
    res.status(404).send('Product not found.');
  }
});

// endpoint to view product details by ID
router.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) {
    res.status(404).send('Product not found');
    return;
  }
  res.json(product); 
});

// endpoint for user authentication
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'user' && password === 'password') {
    res.send('Login successful!');
  } else {
    res.status(401).send('Invalid credentials.');
  }
});

module.exports = router;
