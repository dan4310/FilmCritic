const { getToken } = require('../helpers/token');
const { asyncQuery } = require('../helpers/query');
const { QueryFailedError, DataResult, BadRequestError, NotAllowedError } = require('../helpers/responseResults');

exports.likes_list = async function(req, res) {
    var query = req.query;
    if (Object.keys(query).length > 0) {
        if (query.id === undefined) {
            res.status(405).send(NotAllowedError(`Querying ${Object.keys(query)[0]}`));
        }
        try {
            var data = await asyncQuery("SELECT * FROM ReviewLikes WHERE reviewLikeId = ?", query.id);
        } catch (error) {
            return res.status(400).send(QueryFailedError(error, "Bad query parameters"))
        }
        res.send(DataResult(data[0]))
    } else {
        var data = await asyncQuery("SELECT * FROM ReviewLikes");
        res.send(DataResult(data));
    }  
}

exports.like_list_by_reviewId = async function(req, res) {
    var query = req.query;
    if (query.reviewId === undefined) {
        return res.status(405).send(NotAllowedError("Can only query for by reviewId"));
    }
    try {
        var likes = await asyncQuery("SELECT * FROM ReviewLikes WHERE reviewId = ?", query.reviewId);
        for (let i = 0; i < likes.length; i++) {
            var user = await asyncQuery("SELECT * FROM Users WHERE userId = ?", likes[i].userId);
            likes[i]['user'] = user[0];
        }
        return res.send(DataResult(likes));
    } catch (error) {
        return res.status(400).send(QueryFailedError(error, "Bad reviewId"))
    }
}

exports.likes_create = async function(req, res) {
    const token = getToken(req);
    var user = token.user;
    var body = req.body;

    try {
        var alreadyCreated = await asyncQuery(
            "SELECT * FROM ReviewLikes WHERE userId = ? AND reviewId = ?",
            [user.userId, body.reviewId]
        );
        console.log(alreadyCreated)
        if (alreadyCreated.length > 0) {
            return res.status(405).send(NotAllowedError('You already liked this post'))
        }
        await asyncQuery(
            "INSERT INTO ReviewLikes (userId, reviewId) VALUES (?, ?)",
            [user.userId, body.reviewId]
        );
    } catch (error) {
        return res.status(400).send(QueryFailedError(error, "Bad values"));
    }

    var review = await asyncQuery(
        "SELECT * FROM ReviewLikes WHERE userId = ? AND reviewId = ?",
        [user.userId, body.reviewId]
    );
    res.send(DataResult(review[0]));
}

exports.likes_delete = async function(req, res) {
    const token = getToken(req);
    var user = token.user;
    var body = req.body;
    var likes;

    try {
        likes = await asyncQuery(
            "SELECT * FROM ReviewLikes WHERE userId = ? AND reviewId = ?",
            [user.userId, body.reviewId]
        );
        if (likes.length === 0) {
            return res.status(405).send(NotAllowedError('You have not liked this post'))
        };
    } catch (error) {
        return res.status(400).send(QueryFailedError(error, "Bad values"));
    }
    await asyncQuery(
        "DELETE FROM ReviewLikes WHERE reviewId = ? AND userId = ?",
        [body.reviewId, user.userId]
    );
    res.send(DataResult(likes[0]))
}