const HomeModel = require('../models/homes.model');

module.exports = { getAllHomes, getHomeById, deleteHomeById, createHome, updateHome };

function getAllHomes(req, res) {
  if (typeof req.query.occupied !== 'undefined') {
    HomeModel.find({
        occupied: req.query.occupied
    })
      .populate('owner')
      .then(response => res.json(response))
      .catch((err) => handdleError(err, res))
  } else {
    HomeModel.find()
      .populate('owner')
      .then(response => res.json(response))
      .catch((err) => handdleError(err, res))
  }
}
function getHomeById(req, res) {
  HomeModel.findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function deleteHomeById(req, res) {
  HomeModel.findById(req.params.id)
    .remove()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function createHome(req, res) {
  // TODO: Validate the owner ID
  HomeModel.create(req.body)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}
function updateHome(req, res) {
  HomeModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators : true })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function handdleError(err, res) {
    return res.status(400).json(err);
}