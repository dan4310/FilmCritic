const { QueryFailedError, NotAllowedError, DataResult } = require('../helpers/responseResults');
const { asyncQuery } = require('../helpers/query');
const { getToken } = require('../helpers/token');
const bcrypt = require('bcrypt');


exports.comments_list = async function(req, res) {
    var query = req.query;
    if (Object.keys(query).length > 0) {
        if (query.id === undefined) {
            if (query.reviewId != undefined) {
                try {
                    var data = await asyncQuery("SELECT * FROM Comments WHERE reviewId = ? ORDER BY created DESC", query.reviewId);
                    for (let i = 0; i < data.length; i++) {
                        var user = await asyncQuery("SELECT * FROM Users WHERE userId = ?", data[i].userId);
                        data[i]['user'] = user[0];
                    }
                    return res.send(DataResult(data));
                } catch (error) {
                    return res.status(400).send(QueryFailedError(error, "Bad query parameters"))
                } 
            } else {
                return res.status(405).send(NotAllowedError(`Querying ${Object.keys(query)[0]}`));
            }
        } else {
            try {
                var data = await asyncQuery("SELECT * FROM Comments WHERE commentId = ?", query.id);
            } catch (error) {
                return res.status(400).send(QueryFailedError(error, "Bad query parameters"))
            }
        }
        
        res.send(DataResult(data[0]))
    } else {
        var data = await asyncQuery("SELECT * FROM Comments");
        res.send(DataResult(data));
    } 
}

exports.comments_create = async function(req, res) {
    const token = getToken(req);
    var user = token.user;
    var body = req.body;

    try {
        await asyncQuery(
            "INSERT INTO Comments (userId, reviewId, text) VALUES (?, ?, ?)",
            [user.userId, body.reviewId, body.text]
        );
    } catch (error) {
        return res.status(400).send(QueryFailedError(error, "Bad values"));
    }
    res.send(DataResult({ success: true }));
}