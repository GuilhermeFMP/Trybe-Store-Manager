const errorMap = {
  INPUT_MISSING: 400,
  SERVER_ERROR: 400,
  PRODUCT_NOT_FOUND: 404,
  INVALID_VALUE: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};