const Sale = require('../services/saleService');

const createSale = async (req, res) => { 
    const newSale = await Sale.createNewSale(req.body);
  
    // Client Error 422 --> Unprocessable Entity
    // Client Error 404 --> Not Found
    // Sucess 200 --> OK

    if (newSale.err) return res.status(422).json(newSale);
    
    return res.status(200).json(newSale);
  };

const getAllSales = async (_req, res) => {
    const listAllSales = await Sale.listsale();
    return res.status(200).json(listAllSales);
};

const getSaleId = async (req, res) => {
    const { id } = req.params;
    const saleSelect = await Sale.listSaleId(id);
    if (saleSelect.err) return res.status(404).json(saleSelect);

    return res.status(200).json(saleSelect);
};

const updateSale = async (req, res) => {
    const { id } = req.params;
    const update = await Sale.updateSale(id, req.body);

    if (update.err) return res.status(422).json(update);
    return res.status(200).json(update);
};

const deleteSale = async (req, res) => {
    const { id } = req.params;
    const saleDelete = await Sale.deleteSale(id);
  
    if (saleDelete.err) return res.status(422).json(saleDelete);
  
    return res.status(200).json(saleDelete);
  }; 
  
module.exports = { createSale, getAllSales, getSaleId, updateSale, deleteSale };