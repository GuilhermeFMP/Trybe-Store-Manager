const productMock = {
  name: 'Master Sword',
};

const newProductMock = { id: 1, ...productMock };

const productListMock = [newProductMock];

module.exports = {
  productMock,
  newProductMock,
  productListMock,
};