const connection = require('./connection');

const createDate = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const insert = async (sale, id) => {
  const [{ insertid }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, sale.productId, sale.quantity],
  );
  return insertid;
};

const findbyId = async (id) => {
  const [sale] = await connection.execute(
    'SELECT product_id as productId, quantity FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  ); 
  return sale;
};

module.exports = {
  createDate,
  insert,
  findbyId,

}; 