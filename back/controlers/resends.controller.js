const ResendModel = require('../models/resends.model');
const UserModel = require('../models/users.model')

module.exports = {
  getAllResends,
  getResendById,
  deleteResendById,
  createResend,
  updateResend ,
  getAllResenderLocations
};

function getAllResends(req, res){
  ResendModel.find()
  .then(response => res.json(response))
  .catch((err) => handdleError(err, res))
}
function getResendById(req, res) {
  ResendModel.findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function deleteResendById(req, res) {
  ResendModel.findById(req.params.id)
    .remove()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function createResend(req, res) {
  // TODO: Validate the owner ID
  ResendModel.create(req.body)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}
function updateResend(req, res) {
  ResendModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators : true })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getAllResenderLocations(req,res) {
  UserModel.find({ _id: { $ne: res.locals.user._id } }, { location: 1 })
    .then(users => { res.json(users) })
    .catch((err) => handdleError(err, res))
}

function handdleError(err, res) {
  return res.status(400).json(err);
}