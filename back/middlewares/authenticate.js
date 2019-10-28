const jwt = require("jsonwebtoken");
const UserModel = require('../models/users.model')
const authenticate = (req, res, next) => {
 jwt.verify(req.headers.access_token, config.secrets.authSecret , (err, token) => {
   if (err) {
     res.status(403).json({
       error: 'Token not valid'
     })
   }
   UserModel.findOne({
       email: token.email
     })
     .then(user => {
       res.locals.user = user
       next()
     })
 });
}
module.exports = authenticate;




/*const jwt = require('jsonwebtoken');


const authenticate = (req,res,next) => {
  jwt.verify(req.headers.token, 'secret', (err, token) =>{
    console.log(err);
    
    if (err) { res.status(403).json({error: 'Token not valid'})}
    res.locals.token = token;
    next();
  });
}

module.exports = authenticate;*/