const { QueryFailedError, DataResult, NotAllowedError } = require('../helpers/responseResults');
const { asyncQuery } = require('../helpers/query');
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/token');

exports.user_list = async function(req, res) {
    var query = req.query;
    
    if (Object.keys(query).length > 0) {
        if (query.id === undefined) {
            res.status(405).send(NotAllowedError(`Querying ${Object.keys(query)[0]}`));
        }
        try {
            var data = await asyncQuery("SELECT * FROM Users WHERE userId = ?", query.id);
        } catch (error) {
            res.status(400).send(QueryFailedError(error, "Bad query parameters"))
        }
        res.send(DataResult(data[0]))
    } else {
        var data = await asyncQuery("SELECT * FROM Users");
        res.send(DataResult(data));
    }       
};

exports.user_profile = async function(req, res) {
    var query = req.query;
    try {
        var data = await asyncQuery("SELECT * FROM Users WHERE username = ?", query.username);
        data = { user: data[0] };
        var reviews = await asyncQuery("SELECT * FROM Reviews WHERE userId = ?", data.user.userId);
        for (let i = 0; i < reviews.length; i++) {
            var author = await asyncQuery("SELECT * FROM Users WHERE userId = ?", reviews[i].userId);
            reviews[i]['user'] = author[0];
        }
        data['reviews'] = reviews;
    } catch (error) {
        res.status(400).send(QueryFailedError(error, "Bad query parameters"))
    }
    res.send(DataResult(data))
}

exports.user_create = async function(req, res) {
    var body = req.body;
    const hash = bcrypt.hashSync(body.password, Number(process.env.SALT_ROUNDS));
    var alreadyCreated = await asyncQuery(`SELECT * FROM Users WHERE username = ?`, body.username)
    if (alreadyCreated.length > 0) {
        return res.status(405).send(NotAllowedError(`User '${body.username}' already exists`));
    }
    try {
        var data = await asyncQuery(`
            INSERT INTO Users
            (username, password, email, firstName, lastName) VALUES 
            (?, ?, ?, ?, ?)
        `, [body.username, hash, body.email, body.firstName, body.lastName]);
    } catch (error) {
        res.status(400).send(QueryFailedError(error, `Failed to create user: ${body.username}`));
        return;
    }
    var user = await asyncQuery(`SELECT * FROM Users WHERE username = ?`, body.username);
    var jwtTokenKey = process.env.AUTH_TOKEN_KEY;
    const token = generateToken({ user: user[0] });
    res.cookie(jwtTokenKey, token);
    res.send(DataResult(user[0]));
}