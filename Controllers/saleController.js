const Sale = require('../services/saleService');

const createSale = async (req, res, _next) => { 
    const newSale = await Sale.createNewSale(req.body);
  
    // Client Error 422 --> Unprocessable Entity
    // Sucess 200 --> OK

    if (newSale.err) return res.status(422).json(newSale);
    
    return res.status(200).json(newSale);
  };

const getAllSales = async (_req, res, _next) => {
    const listAllSales = await Sale.listsale();
    return res.status(200).json(listAllSales);
};

module.exports = { createSale, getAllSales };