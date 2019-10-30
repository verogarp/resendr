const UserModel = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let config = require('../.env');

module.exports = {
  signup,
  login,
  whoami
};

function signup(req, res) {
  const hashed_pwd = bcrypt.hashSync(req.body.password, 10);
  UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: hashed_pwd,
    location: req.body.location,
  })
  .then(() => {
    const user_data = { username: req.body.name, email: req.body.email};

    const token = jwt.sign(
      user_data,
      config.secrets.authSecret,
      { expiresIn: "9h" }
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

      const user_data = { username: user.name, email: req.body.email };

      const token = jwt.sign(
        user_data,
        config.secrets.authSecret,
        { expiresIn: "9h" }
      );

      return res.json({ token: token, ...user_data });
    })
  })
  .catch(err => handdleError(err, res));
}

function whoami(req, res){
  const decodedUser = jwt.decode(req.headers.access_token, config.secrets.authSecret)
  UserModel
  .findOne({email : decodedUser.email})
  .then(user =>  {
    if (!user) { return res.json({error: 'wrong email'}) }
    return res.json(user)
  })
  .catch(err => handdleError(err, res))

}