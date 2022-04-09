const app = require('./app');
require('dotenv').config();
const { NotAuthorizedError } = require("./helpers/responseResults");


app.applyMiddleware("/", (req, res, next) => {
    if (req.query.api_key){
        if (process.env.API_KEY === req.query.api_key) {
            delete req.query.api_key;
            next();
            return;
        } 
        res.status(401).send(NotAuthorizedError(`API key ${req.query.api_key} is not authorized`));
    } else {
        res.status(401).send(NotAuthorizedError(`Must provide API key for authorization`));
    }
    
});

var server = app.startServer();