const Database = require('./database/database');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require("./routes/users")
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const reviewRouter = require("./routes/reviews");
const likesRouter = require('./routes/likes');
const commentsRouter = require('./routes/comments');
const { NotFoundError, RunTimeError } = require('./helpers/responseResults')
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}));
app.use(bodyParser.json());
app.use(cookieParser());

function applyRoutes() {
    app.use(indexRouter);
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/reviews', reviewRouter);
    app.use('/likes', likesRouter);
    app.use('/comments', commentsRouter);

    app.use((req, res, next) => {
        return res.status(404).send(NotFoundError(req.url))
    });
    
    app.use(function (err, req, res, next) {
        console.log(err.stack)
        return res.status(500).send(RunTimeError(err));
    })
}

exports.applyMiddleware = (route, controller) => {
    app.use(route, controller);
}

exports.startServer = () => app.listen(process.env.PORT, (error) => {
    applyRoutes();
    if (error) {
        console.log(error);
        return;
    }
    console.log(`Server started on port ${process.env.PORT}`);
});

exports.app = app;