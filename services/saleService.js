const Sale = require('../models/saleModel');

const objectForErrors = {
    err: {
      code: 'invalid_data',
      message: '',
    },
  };

const objectForErrors2 = {
    err: {
    code: 'not_found',
    message: '',
    },
}; 
const objectForErrors3 = {
    err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  },
};  

const validateIdExist = async (id) => {
    const productExist = await Sale.findById(id);
    if (!productExist) {
        objectForErrors2.err.message = 'Sale not found';
        return objectForErrors2;
    }
};

const ValidateNegativeQuantity = (quantity) => {
    const minimal = 1;
    if (quantity < minimal) return true;

    if (typeof quantity !== 'number') return true;
};
  
const validateQuantity = (products) => {
    const quantity = products.some((product) => ValidateNegativeQuantity(product.quantity));
    if (quantity) {
    objectForErrors.err.message = 'Wrong product ID or invalid quantity';
    return objectForErrors;
    }
};

const createNewSale = async (products) => {
    const sale = validateQuantity(products);
    if (sale) return sale;
    
    const createSale = await Sale.create(products);
    return createSale;
};

const listsale = async () => {
    const sales = await Sale.getAll();
    return { sales };
};

const listSaleId = async (id) => {
    const saleId = await validateIdExist(id);
    if (saleId) return saleId;

    const sale = await Sale.findById(id);
    return sale;
};

const updateSale = async (id, product) => {
    const validSale = validateQuantity(product);
    if (validSale) return validSale;

    const createSale = await Sale.update(id, product);
    return createSale;
};

const deleteSale = async (id) => {
    const takeSale = await listSaleId(id);
    if (takeSale.err) return objectForErrors3;

    const sale = await Sale.exclude(id);
    return sale && takeSale;
};

module.exports = { createNewSale, listsale, listSaleId, updateSale, deleteSale };
