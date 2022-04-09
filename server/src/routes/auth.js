var express = require('express');
var router = express.Router();

var auth_controller = require('../controllers/authController');

router.post('/login', auth_controller.login);
router.get('/me', auth_controller.me);

router.post('/logout', auth_controller.validate_token, auth_controller.log_out);

module.exports = router;