const schema = require('../services/validations/schemas');

const inputProductValidation = (req, res, next) => {
  const product = req.body;
  if (!product.name) {
    return res.status(400).json({
      message: '"name" is required',
    });
  }

  const { error } = schema.validateNameProduct.validate(product);
  if (error) {
    return res.status(422).json({ message: error.message });
  }

  next();
};

const inputSaleValidation = (req, res, next) => {
  const sales = req.body;
  sales.forEach((sale) => {
    if (sale.quantity < 1) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  });
  
  const { error } = schema.validateSale.validate(sales);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = {
  inputProductValidation,
  inputSaleValidation,
};