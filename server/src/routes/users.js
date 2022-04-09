var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

router.get('/', user_controller.user_list);

router.post('/', user_controller.user_create);

router.get('/profile', user_controller.user_profile);

module.exports = router;