const router = require('express').Router();

const {
  signup,
  login,
  whoami
} = require('../controlers/auth.controller');

router.post('/signup', signup);
router.post('/login', login);
router.get("/whoami", whoami);

module.exports = router;