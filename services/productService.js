// A camada service sera responsavel par nossos calculos, validações e Regra de neǵocio.
// Recebe dados do controller, trata os dados e manda para model.
const Product = require('../models/productModel');

// cria um padrao de objeto para os erros

const objectForErrors = {
    err: {
      code: 'invalid_data',
      message: '',
    },
  };

// Validação para não criar um produto com um nome ja existente

const validateNameExist = async (name) => {
    const nameExist = await Product.findName(name);
    if (nameExist) {
        objectForErrors.err.message = 'Product already exists';
        return objectForErrors; 
    }
};

// Validaçao se produto tiver o nome menor que 5 caracters

const validateNameLength = (name) => {
    const characters = 5;
    if (name.length < characters) {
       objectForErrors.err.message = '"name" length must be at least 5 characters long';
       return objectForErrors;
    }
};

// validação se produto tiver quantidade menor que zero e se for uma string

const ValidateNegativeQuantity = (quantity) => {
    const quantityNumber = 1;
    if (quantity < quantityNumber) {
        objectForErrors.err.message = '"quantity" must be larger than or equal to 1';
        return objectForErrors; 
    }
    if (typeof quantity !== 'number') {
        objectForErrors.err.message = '"quantity" must be a number';
        return objectForErrors;
    }
};

// validaçao que não é possivel listar um produto que não existe

const validateIdExist = async (id) => {
    const productExist = await Product.findById(id);
    if (!productExist) {
        objectForErrors.err.message = 'Wrong id format';
        return objectForErrors;
    }
};

// cadastra um novo produto no banco de dados.

const createNewProduct = async (name, quantity) => {
    const validProduct = await validateNameExist(name);
    if (validProduct) return validProduct;

    const validProductName = validateNameLength(name);
    if (validProductName) return validProductName;

    const validQuantity = ValidateNegativeQuantity(quantity);
    if (validQuantity) return validQuantity;

    const createProduct = await Product.create(name, quantity);
    return createProduct;
};

// lista todos os prudutos.

const listProducts = async () => {
    const products = await Product.getAll();
    return { products };
};

// lista apenas um produto por id passado.

const listProductId = async (id) => {
    const productId = await validateIdExist(id);
    if (productId) return productId;

    const product = await Product.findById(id);
    return product;
};

// atualiza produto 

const updateProduct = async (id, name, quantity) => {
    const validProductName = validateNameLength(name);
    if (validProductName) return validProductName;

    const validQuantity = ValidateNegativeQuantity(quantity);
    if (validQuantity) return validQuantity;

    const createProduct = await Product.update(id, name, quantity);
    return createProduct;
};

const deleteProduct = async (id) => {
    const takeproduct = await listProductId(id);
    if (takeproduct.err) return takeproduct;

    const product = await Product.exclude(id);
    return product && takeproduct;
};

module.exports = { createNewProduct, listProductId, listProducts, updateProduct, deleteProduct };