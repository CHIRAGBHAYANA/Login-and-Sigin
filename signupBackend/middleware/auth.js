const jwt = require("jsonwebtoken");
const tokenKey = process.env.TOKEN_SECRET;

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).send("You don't have access to this resource");
  try {
    const verified = jwt.verify(token, tokenKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
