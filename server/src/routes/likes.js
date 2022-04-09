var express = require('express');
var router = express.Router();

const reviewLikesController = require('../controllers/reviewLikesController');
const authController = require('../controllers/authController');

router.get('/', reviewLikesController.likes_list);

router.post('/', authController.validate_token, reviewLikesController.likes_create);

router.delete('/', authController.validate_token, reviewLikesController.likes_delete);

router.get('/review', reviewLikesController.like_list_by_reviewId);

module.exports = router;