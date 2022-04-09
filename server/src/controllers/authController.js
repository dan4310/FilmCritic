const { asyncQuery } = require('../helpers/query');
const { QueryFailedError, NotAuthorizedError, DataResult } = require('../helpers/responseResults');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken, getToken } = require('../helpers/token');

exports.login = async function(req, res) {
    var body = req.body;
    try {
        var users = await asyncQuery(`SELECT * FROM Users WHERE username = ?`, body.username);
    } catch (error) {
        res.status(400).send(QueryFailedError(error, "Bad body parameters"));
        return;
    }
    const user = users[0];
    if (!user) {
        res.status(401).send(NotAuthorizedError(`User '${body.username}' does not exist`));
    }
    if (!bcrypt.compareSync(body.password, user.password)) {
        res.status(401).send(NotAuthorizedError(`Password does not match for user ${body.username}`));
        return;
    }
    var jwtTokenKey = process.env.AUTH_TOKEN_KEY;
    const token = generateToken({ user: user});
    res.cookie(jwtTokenKey, token);
    res.send(DataResult(user));
}

exports.validate_token = async function(req, res, next) {
    var jwtSecret = process.env.JWT_KEY;
    var jwtTokenKey = process.env.AUTH_TOKEN_KEY;
    try {
        var token = req.cookies[jwtTokenKey];
        var verified = jwt.verify(token, jwtSecret);

        var user = await asyncQuery("SELECT * FROM Users WHERE userId = ?", jwt.decode(token).user.userId);

        if (user[0].count != jwt.decode(token).user.count) {
            verified = false;
        }
        if (!verified) {
            res.status(401).send(NotAuthorizedError('Invalid JWT'));
            return;
        }
        
    } catch (error) {
        return res.status(401).send(NotAuthorizedError('No JWT present'));
    }
    next();
}

exports.log_out = async function(req, res) {
    var token = getToken(req);
    try {
        var user = await asyncQuery("SELECT * FROM Users WHERE userId = ?", token.user.userId);
        var user = user[0];
        await asyncQuery("UPDATE Users SET count = ? WHERE userId = ?", [user.count+1, user.userId]);
        res.send({ success: true })
    } catch (error) {
        res.status(400).send(QueryFailedError(error, "Bad token values"))
    }
} 

exports.me = async function(req, res) {
    var jwtSecret = process.env.JWT_KEY;
    var jwtTokenKey = process.env.AUTH_TOKEN_KEY;
    try {
        var token = req.cookies[jwtTokenKey];
        var verified = jwt.verify(token, jwtSecret);
        console.log(jwt.decode(token).user.count)
        var user = await asyncQuery("SELECT * FROM Users WHERE userId = ?", jwt.decode(token).user.userId);
        if (user[0].count != jwt.decode(token).user.count) {
            verified = false;
        }
        if (!verified) {
            return res.send(NotAuthorizedError("Invalid JWT"));
        }
    } catch (error) {
        return res.send(NotAuthorizedError("No JWT present"));
    }
    res.send(DataResult(jwt.decode(token).user));
}