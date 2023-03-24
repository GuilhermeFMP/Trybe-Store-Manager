const express = require('express');
const { salesController } = require('../controllers');
const validations = require('../middlewares/validations');

const router = express.Router();

router.get(
  '/',
  salesController.listSales,
);

router.get(
  '/:id',
  salesController.getSale,
);

router.post(
  '/',
  validations.inputSaleValidation,
  salesController.createSale,
);

module.exports = router;