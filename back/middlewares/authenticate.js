const jwt = require("jsonwebtoken");
let config = require("../.env");
const UserModel = require("../models/users.model");

function isWhiteListed(req){
 return req.path == "/api/auth/login" || req.path == "/api/auth/signup";
}

const authenticate = (req, res, next) => {
  if (isWhiteListed(req)) {
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
