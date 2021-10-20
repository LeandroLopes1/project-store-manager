// responsavel pela conexão com o banco de dados.
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findName = async (name) => {
    const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));
    return product;
};

const findById = async (id) => {
    const hexCharacters = 24;
    if (id.length !== hexCharacters) return null;

    const productId = await connection()
    .then((db) => db.collection('products').findOne({ _id: new ObjectId(id) }));
    return productId;
};

const getAll = async () => {
    const allProduct = await connection()
    .then((db) => db.collection('products').find({}).toArray());
    return allProduct;
};

const create = async (name, quantity) => {
    const productCreate = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
    return productCreate.ops[0];
};

module.exports = { create, findName, getAll, findById };