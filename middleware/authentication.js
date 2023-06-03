const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "coder");
    if (decoded) {
      req.body.userID = decoded.userID;
      next();
    } else {
      res.send({ message: "Please login first" });
    }
  } else {
    res.send({ message: "Please login first" });
  }
};
module.exports = { authenticate };
