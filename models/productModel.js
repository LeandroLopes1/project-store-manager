// responsavel pela conexão com o banco de dados.
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findName = async (name) => {
    const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));
    return product;
};

const findById = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const productId = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
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

const update = async (id, name, quantity) => {
    await connection().then((db) => db.collection('products').updateOne({ _id: ObjectId(id) }, 
    { $set: { name, quantity } }));
     return { id, name, quantity };
};

const exclude = async (id) => {
     if (!ObjectId.isValid(id)) return null;
    const product = await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
    return product;
};

module.exports = { create, findName, getAll, findById, update, exclude };