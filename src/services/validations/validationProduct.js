const { productsModel } = require('../../models');
const { validateSale } = require('./schemas');

const validationProduct = async (sales) => {
  const { error } = validateSale.validate(sales);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  const product = await Promise.all(sales.map(async (sale) => productsModel
    .findById(sale.productId)));
  const isMissing = product.some((prod) => prod === undefined);
  if (isMissing) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  validationProduct,
};