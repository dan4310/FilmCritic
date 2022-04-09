var express = require('express');
var router = express.Router();

var review_controller = require('../controllers/reviewController');
var auth_controller = require('../controllers/authController');

router.get('/', review_controller.review_list);

router.post('/', auth_controller.validate_token, review_controller.review_create)

router.get('/movies', review_controller.reviews_movie_by_id);

router.get('/shows', review_controller.reviews_show_by_id);

module.exports = router;