const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUser,
  getUserByLocation
} = require('../controlers/users.controller');

router.get('/', getAllUsers);
router.get('/byLocation/:location', getUserByLocation);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById)
router.post('/', createUser);
router.put('/:id', updateUser)

module.exports = router;