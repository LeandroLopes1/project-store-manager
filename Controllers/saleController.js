const Sale = require('../services/saleService');

const createSale = async (req, res, _next) => { 
    const newSale = await Sale.createNewSale(req.body);
  
    // Client Error 422 --> Unprocessable Entity
    // Client Error 404 --> Not Found
    // Sucess 200 --> OK

    if (newSale.err) return res.status(422).json(newSale);
    
    return res.status(200).json(newSale);
  };

const getAllSales = async (_req, res, _next) => {
    const listAllSales = await Sale.listsale();
    return res.status(200).json(listAllSales);
};

const getSaleId = async (req, res, _next) => {
    const { id } = req.params;
    const saleSelect = await Sale.listSaleId(id);
    if (saleSelect.err) return res.status(404).json(saleSelect);

    return res.status(200).json(saleSelect);
};

module.exports = { createSale, getAllSales, getSaleId };