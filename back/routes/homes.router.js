const router = require('express').Router();

const {
  getAllHomes,
  getHomeById,
  deleteHomeById,
  createHome,
  updateHome
} = require('../controlers/homes.controller');

router.get('/', getAllHomes);
router.get('/:id', getHomeById);
router.delete('/:id', deleteHomeById)
router.post('/', createHome);
router.put('/:id', updateHome)

module.exports = router;