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

module.exports = {
  inputProductValidation,
};