const express = require('express');
const router = express.Router();
const productController = require('../controllers/products'); 
const authMiddleware = require('../middlewares/auth');

//define the CRUD api routes 
// CRUD => REST API Using GET, POST, PUT, DELETE HTTP verbs

// GET /products (Read all products)
router.get('/', productController.getAllProducts);

// GET /products/:id (Read a product by ID)
router.get('/:id', productController.getProductById);

// POST /products (Create a new product)
router.post('/', authMiddleware, productController.createProduct);

// PUT /products/:id (Update a product)
router.put('/:id', authMiddleware, productController.updateProduct);

// DELETE /products/:id (Delete a product)
router.delete('/:id',authMiddleware,  productController.deleteProduct);

module.exports = router;