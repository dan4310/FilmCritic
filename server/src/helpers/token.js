const jwt = require('jsonwebtoken');

exports.generateToken = function(data) {
    var jwtSecret = process.env.JWT_KEY;
    const token = jwt.sign(data, jwtSecret, { expiresIn: '86400s' });
    return token;
}

exports.getToken = function(req) {
    var jwtSecret = process.env.JWT_KEY;
    var jwtTokenKey = process.env.AUTH_TOKEN_KEY;
    try {
        var token = req.cookies[jwtTokenKey];
        const verified = jwt.verify(token, jwtSecret);
        if (!verified) {
            return null;
        }
    } catch (error) {
        return null;
    }
    return jwt.decode(token);
}