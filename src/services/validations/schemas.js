const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const validateNameProduct = Joi.object({
  name: Joi.string().min(5).required().label('name'),
}).messages({
  'any.required': 'name is required',
  'string.min': '"name" length must be at least 5 characters long',
});

module.exports = {
  idSchema,
  validateNameProduct,
};