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

const findAll = async () => {
  const [products] = await connection.execute(
    `SELECT sale.id as saleId, sale.date, sell.product_id as productId, sell.quantity 
    FROM StoreManager.sales as sale
    INNER JOIN StoreManager.sales_products as sell ON sale.id = sell.sale_id
    ORDER BY sale.id, sell.product_id;`,
  );
  return products; 
};

const findSaleById = async (productId) => {
  const [products] = await connection.execute(
    `SELECT sale.date, sell.product_id as productId, sell.quantity 
    FROM StoreManager.sales as sale
    INNER JOIN StoreManager.sales_products as sell ON sale.id = sell.sale_id
    WHERE sale.id = ? ;`,
    [productId],
  );
  return products;
};

module.exports = {
  createDate,
  insert,
  findbyId,
  findAll,
  findSaleById,
}; 