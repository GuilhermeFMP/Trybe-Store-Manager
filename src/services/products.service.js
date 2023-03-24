const { productsModel } = require('../models');
const { validateId, validateName } = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  if (!products) return { type: 'SERVER_ERROR', message: 'Cannot get products' };
  return { type: null, message: products };
};
const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const createProduct = async (name) => {
  const newProductId = await productsModel.insert(name);
  const newProduct = await productsModel.findById(newProductId);
  return { type: null, message: newProduct };
};

const attProduct = async (id, name) => {
  const errorName = validateName(name);
  const errorId = validateId(id);

  if (errorName.type) return errorName;
  if (errorId.type) return errorId;
  const product = await productsModel.findById(id);
  console.log(product);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModel.update(id, name);
  const updateProduct = await productsModel.findById(id);
  return { type: null, message: updateProduct };
};

const deleteProduct = async (id) => {
  const errorId = validateId(id);

  if (errorId.type) return errorId;

  const product = await productsModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModel.deleteById(id);
  return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  attProduct,
  deleteProduct,
};