const UserModel = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let config = require('../.env');

module.exports = {
  signup,
  login
};

function signup(req, res) {
  const hashed_pwd = bcrypt.hashSync(req.body.password, 10);
  UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: hashed_pwd,
    location: req.body.location,
    role: req.body.role
  })
  .then(() => {
    const user_data = { username: req.body.name, email: req.body.email};

    const token = jwt.sign(
      user_data,
      config.secrets.authSecret,
      { expiresIn: "1h" }
    );

    return res.json({ token: token, ...user_data })
  })
  .catch((err) => res.status(403).json({error: err.errmsg}))
}

function login(req, res) {
  UserModel
  .findOne({email: req.body.email})
  .then(user => {
    if (!user) { return res.json({error: 'wrong email'}) }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (!result) { return res.json({error: `wrong password for ${req.body.user_email}`}) }

      const user_data = { username: req.body.name, email: req.body.email };

      const token = jwt.sign(
        user_data,
        config.secrets.authSecret,
        { expiresIn: "1h" }
      );

      return res.json({ token: token, ...user_data });
    })
  })
  .catch(err => handdleError(err, res));
}