const UserModel = require("../models/users.model");

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUser,
  getUserByLocation
};

function getAllUsers(req, res) {
  UserModel.find()
    .then(response => res.json(response))
    .catch(err => handdleError(err, res));
}

function getUserById(req, res) {
  UserModel.findById(req.params.id)
    .then(response => res.json(response))
    .catch(err => handdleError(err, res));
}

function getUserByLocation(req, res) {
  UserModel.find({ "location.province": { $eq: req.params.location } })
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => handdleError(err, res));
}

function deleteUserById(req, res) {
  UserModel.findById(req.params.id)
    .remove()
    .then(response => res.json(response))
    .catch(err => handdleError(err, res));
}

function createUser(req, res) {
  UserModel.create(req.body)
    .then(response => res.json(response))
    .catch(err => handdleError(err, res));
}

function updateUser(req, res) {
  UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .then(response => res.json(response))
    .catch(err => handdleError(err, res));
}

function handdleError(err, res) {
  return res.status(400).json(err);
}
