const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products; 
};

const findById = async (productId) => {
  const [[products]] = await connection.execute(
    'SELECT * FROM products WHERE id = ? ORDER BY id ASC',
    [productId],
  );
  return products;
};

module.exports = {
  findAll,
  findById,
};