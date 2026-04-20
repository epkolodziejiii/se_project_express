const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED_STATUS_CODE } = require("../utils/errors");

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    const err = new Error("Authorization Required");
    err.statusCode = UNAUTHORIZED_STATUS_CODE;
    return next(err);
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    const err = new Error("Authorization Required");
    err.statusCode = UNAUTHORIZED_STATUS_CODE;
    return next(err);
  }
}

module.exports = auth;
