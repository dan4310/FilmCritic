var express = require('express');
var router = express.Router();

const commentsController = require('../controllers/commentController');
const authController = require('../controllers/authController');

router.get('/', commentsController.comments_list);

router.post('/', authController.validate_token, commentsController.comments_create);

module.exports = router;