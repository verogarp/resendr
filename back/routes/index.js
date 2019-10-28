const authenticate = require("../middlewares/authenticate")

const router = require('express').Router();
const resendsRouter = require('./resends.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');

router.use('/resends', authenticate, resendsRouter);
router.use('/users', authenticate, usersRouter);
router.use('/auth',  authRouter);


module.exports = router;
