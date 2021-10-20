// responsavel pelas request e response.
const Product = require('../services/productService');

const createProduct = async (req, res, _next) => {
        const { name, quantity } = req.body;
        const newProduct = await Product.createNewProduct(name, quantity);

        // Client Error 422 --> Unprocessable Entity
        // Sucess 201 --> created
      
        if (newProduct.err) {
          return res.status(422).json(newProduct);
        }
      
        return res.status(201).json(newProduct);
      };

const getAllProduct = async (req, res, _next) => {
    const listAllProduct = await Product.listProducts();
    return res.status(200).json(listAllProduct);
};

const getProductId = async (req, res, _next) => {
    const { id } = req.params;
    const productSelect = await Product.listProductId(id);
    if (productSelect.err) return res.status(422).json(productSelect);

    return res.status(200).json(productSelect);
};

const updateProduct = async (req, res, _next) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const update = await Product.updateProduct(id, name, quantity);

    if (update.err) return res.status(422).json(update);
    return res.status(200).json(update);
};

module.exports = { createProduct, getAllProduct, getProductId, updateProduct };