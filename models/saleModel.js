const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (product) => {
    const productSale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: [...product] }));
    return productSale.ops[0];
};

const getAll = async () => {
    const allSale = await connection()
    .then((db) => db.collection('sales').find({}).toArray());
    return allSale;
};

const findById = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const saleId = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
    return saleId;
};

module.exports = { create, getAll, findById };