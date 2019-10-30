const jwt = require("jsonwebtoken");
let config = require("../.env");
const UserModel = require("../models/users.model");
const authenticate = (req, res, next) => {
  if (req.path == "/api/auth/login" || req.path == "/api/auth/signup") {
    next();
  } else {
    jwt.verify(
      req.headers.access_token,
      config.secrets.authSecret,
      (err, token) => {
        if (err) {
          return res.status(403).json({
            error: "Token not valid"
          });
        }
        UserModel.findOne({
          email: token.email
        }).then(user => {
          res.locals.user = user;
          next();
        });
      }
    );
  }
};
module.exports = authenticate;
