const { salesModel } = require('../models');
const { validationProduct } = require('./validations/validationProduct');

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
};