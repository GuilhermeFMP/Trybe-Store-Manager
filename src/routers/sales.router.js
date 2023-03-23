const express = require('express');
const { salesController } = require('../controllers');
const validations = require('../middlewares/validations');

const router = express.Router();

router.post(
  '/',
  validations.inputSaleValidation,
  salesController.createSale,
);

module.exports = router;