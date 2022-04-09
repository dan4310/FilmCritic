const { getToken } = require('../helpers/token');
const { asyncQuery } = require('../helpers/query');
const { QueryFailedError, DataResult, BadRequestError, NotAllowedError } = require('../helpers/responseResults');

exports.review_list = async function(req, res) {    
    var query = req.query;
    if (Object.keys(query).length > 0) {
        if (query.id === undefined) {
            res.status(405).send(NotAllowedError(`Querying ${Object.keys(query)[0]}`));
        }
        try {
            var data = await asyncQuery("SELECT * FROM Reviews WHERE reviewId = ?", query.id);
        } catch (error) {
            return res.status(400).send(QueryFailedError(error, "Bad query parameters"))
        }
        res.send(DataResult(data[0]))
    } else {
        var data = await asyncQuery("SELECT * FROM Reviews");
        res.send(DataResult(data));
    }  
}

exports.reviews_movie_by_id = async function(req, res) {
    var query = req.query;
    
    if (query.id === undefined) {
        return res.status(400).send(BadRequestError("No id present"));
    }
    try {
        var reviews = await asyncQuery("SELECT * FROM Reviews WHERE isShow = 0 AND movieId = ? ORDER BY created DESC", query.id)
    } catch (error) {
        return res.status(400).send(QueryFailedError(error, "Bad query parameters"));
    }
    for (let i = 0; i < reviews.length; i++) {
        var author = await asyncQuery("SELECT * FROM Users WHERE userId = ?", reviews[i].userId);
        reviews[i]['user'] = author[0];
    }
    res.send(DataResult(reviews));
}

exports.reviews_show_by_id = async function(req, res) {
    var query = req.query;
    
    if (query.id === undefined) {
        return res.status(400).send(BadRequestError("No id present"));
    }
    try {
        var reviews = await asyncQuery("SELECT * FROM Reviews WHERE isShow = 1 AND movieId = ? ORDER BY created DESC", query.id)
    } catch (error) {
        return res.status(400).send(QueryFailedError(error, "Bad query parameters"));
    }
    for (let i = 0; i < reviews.length; i++) {
        var author = await asyncQuery("SELECT * FROM Users WHERE userId = ?", reviews[i].userId);
        reviews[i]['user'] = author[0];
    }
    res.send(DataResult(reviews));
}

exports.review_create = async function(req, res) {
    const token = getToken(req);
    var user = token.user;

    var body = req.body;
    var alreadyCreated = await asyncQuery(
        `SELECT * FROM Reviews WHERE movieId = ? AND isShow = ? AND userId = ?`,
        [body.movieId, body.isShow, user.userId]
    )
    if (alreadyCreated.length > 0) {
        return res.status(405).send(NotAllowedError(`You have already reviewd this movie`));
    }
    try {
        await asyncQuery(
            "INSERT INTO Reviews (text, rating, movieId, userId, isShow) VALUES (?, ?, ?, ?, ?)",
            [body.text, body.rating, body.movieId, user.userId, body.isShow]
        );
    } catch (error) {
        return res.status(400).send(QueryFailedError(error, "Bad review data"))
    }
    var review = await asyncQuery(
        "SELECT * FROM Reviews WHERE userId = ? AND movieId = ? AND isShow = ?",
        [user.userId, body.movieId, body.isShow]
    );
    res.send(DataResult(review[0]));
}