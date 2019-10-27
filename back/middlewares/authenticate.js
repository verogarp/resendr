const jwt = require('jsonwebtoken');


const authenticate = (req,res,next) => {
  if (req.path.contains('/api/auth/')) {
    next();
  }
  jwt.verify(req.headers.token, 'secret', (err, token) =>{
    if (err) { res.status(403).json({error: 'Token not valid'})}
    res.locals.token = token;
    next();
  });
}

module.exports = authenticate;