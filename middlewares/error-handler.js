const { INTERNAL_SERVER_ERROR } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || err.status || INTERNAL_SERVER_ERROR;
  const message = err.message || "An unexpected error occurred";

  res.status(statusCode).send({ message });
};

module.exports = errorHandler;
