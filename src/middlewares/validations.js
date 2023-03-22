const schema = require('../services/validations/schemas');
const errorMap = require('../utils/errorMap');

const inputProductValidation = (req, res, next) => {
  const product = req.body;
  if (!product) {
    return res.status(errorMap.mapError('INPUT_MISSING')).json({
      message: '"name" is required',
    });
  }

  const { error } = schema.validateNameProduct.validate(product);
  if (error) {
    return res.status('INVALID_VALUE').json({ message: error.message });
  }

  next();
};

module.exports = {
  inputProductValidation,
};