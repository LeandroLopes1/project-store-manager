// responsavel pelas request e response.
const Product = require('../services/productService');

const createProduct = async (req, res, _next) => {
        const { name, quantity } = req.body;
        const newProduct = await Product.createNewProduct(name, quantity);
      
        if (newProduct.err) {
          return res.status(422).json(newProduct);
        }
      
        return res.status(201).json(newProduct);
      };

module.exports = { createProduct };