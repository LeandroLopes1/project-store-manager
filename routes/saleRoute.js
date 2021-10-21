const express = require('express');
const saleController = require('../Controllers/saleController');

const saleRoute = express.Router();

saleRoute.post('/', saleController.createSale);

saleRoute.get('/', saleController.getAllSales);

module.exports = saleRoute;