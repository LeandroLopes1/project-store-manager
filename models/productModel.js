// responsavel pela conexão com o banco de dados.
const connection = require('./connection');

const getAll = async (name) => {
    const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));
    return product;
};

const create = async (name, quantity) => {
    const productCreate = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
    return productCreate.ops[0];
};

module.exports = { create, getAll };