const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED_STATUS_CODE } = require("../utils/errors");

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
  return next();
}

module.exports = auth;
