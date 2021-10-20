const express = require('express');
const productController = require('../Controllers/productController');

const productRoute = express.Router();

productRoute.post('/', productController.createProduct);

module.exports = productRoute;
