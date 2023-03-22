const express = require('express');
const { productsController } = require('../controllers');
const validations = require('../middlewares/validations');

const router = express.Router();

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.getProducts,
);

router.post(
  '/',
  validations.inputProductValidation,
  productsController.createProduct,
);

module.exports = router;