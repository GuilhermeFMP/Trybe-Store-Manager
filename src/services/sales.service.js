const { salesModel } = require('../models');
const { validationProduct } = require('./validations/validationProduct');

const findAll = async () => {
  const products = await salesModel.findAll();
  if (!products) return { type: 'SERVER_ERROR', message: 'Cannot get products' };
  return { type: null, message: products };
};

const findById = async (productId) => {
  const product = await salesModel.findSaleById(productId);
  if (!product || product.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: product };
};

const createSales = async (sales) => {
  const idInvalid = await validationProduct(sales);
  if (idInvalid.type) return idInvalid;

  const saleId = await salesModel.createDate();
  await Promise.all(sales.map(async (sale) => salesModel.insert(sale, saleId)));

  const newSales = await salesModel.findbyId(saleId);

  return { type: null, message: { id: saleId, itemsSold: newSales } };
};

module.exports = {
  createSales,
  findById,
  findAll,
};