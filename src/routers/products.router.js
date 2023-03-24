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

router.put(
  '/:id',
  validations.inputProductValidation,
  productsController.attProduct,
);

router.delete(
  '/:id',
  productsController.deleteProduct,
);

module.exports = router;