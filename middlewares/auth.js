const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config.js");
const {
  BAD_REQUEST_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  ASSERTION_ERROR_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(UNAUTHORIZED_STATUS_CODE)
      .send({ error: "Authorization Required" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return res
      .status(UNAUTHORIZED_STATUS_CODE)
      .send({ error: "Authorization Required" });
  }

  req.user = payload;
  next();
}

module.exports = auth;
