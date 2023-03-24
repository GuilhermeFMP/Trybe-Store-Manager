const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return products; 
};

const findById = async (productId) => {
  const [[products]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id ASC',
    [productId],
  );
  return products;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const update = async (id, name) => {
  const [{ insertId }] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return insertId;
};

const deleteById = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};