const router = require('express').Router();

const authenticationController = require('../controllers/authenticationController');

router.post('/login', authenticationController.login);
router.post('/signup', authenticationController.signup);

module.exports = router;