const express = require('express');
const saleController = require('../Controllers/saleController');

const saleRoute = express.Router();

saleRoute.post('/', saleController.createSale);

saleRoute.get('/', saleController.getAllSales);

saleRoute.get('/:id', saleController.getSaleId);

saleRoute.put('/:id', saleController.updateSale);

module.exports = saleRoute;