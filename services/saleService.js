const Sale = require('../models/saleModel');

const objectForErrors = {
    err: {
      code: 'invalid_data',
      message: '',
    },
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
    const sale = await Sale.getAll();
    return { sale };
}; 

module.exports = { createNewSale, listsale };
