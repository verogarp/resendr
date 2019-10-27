const router = require('express').Router();
const homesRouter = require('./homes.router');
const usersRouter = require('./users.router');

router.use('/homes', homesRouter);
router.use('/users', usersRouter);

module.exports = router;