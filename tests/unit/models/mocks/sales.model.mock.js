const sales = [{
  saleId: 1,
  date: "2021-09-09T04:54:29.000Z",
  productId: 1,
  quantity: 5
}];

const withoutId = [{
  date: "2021-09-09T04:54:29.000Z",
  productId: 1,
  quantity: 5
}];

const salesMock = [
  {
    productId: 1,
    quantity: 3,
  },
  {
    productId: 2,
    quantity: 2,
  },
];

module.exports = {
  sales,
  withoutId,
  salesMock,
};