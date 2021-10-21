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

module.exports = { create, getAll };