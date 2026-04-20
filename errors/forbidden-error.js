class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ASSERTION_ERROR_STATUS_CODE;
  }
}

module.exports = ForbiddenError;
