const router = require('express').Router();
const resendsRouter = require('./resends.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');

router.use('/resends', resendsRouter);
router.use('/users', usersRouter);
router.use('/auth',  authRouter);


module.exports = router;
