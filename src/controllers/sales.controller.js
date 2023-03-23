const errorMap = require('../utils/errorMap');
const { salesService } = require('../services');

const createSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.createSales(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  createSale,
};