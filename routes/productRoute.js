const express = require('express');
const productController = require('../Controllers/productController');

const productRoute = express.Router();

productRoute.post('/', productController.createProduct);

productRoute.get('/', productController.getAllProduct);

productRoute.get('/:id', productController.getProductId);

productRoute.put('/:id', productController.updateProduct);

productRoute.delete('/:id', productController.deleteProduct);

module.exports = productRoute;
