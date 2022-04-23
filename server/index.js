const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();

const usersRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const rewardsRouter = require('./routes/reward');
const authMiddleware = require('./middlewares/auth.middleware');
const {errorHandler} = require("./middlewares/errorHandler.middleware");
const {NODE_ENV, MONGO_URI} = require("./common/config");

const app = express();

if (NODE_ENV === "DEV") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}

app.use(cors({
    origin: [
        'http://54.234.105.91',
        'https://54.234.105.91',
        'http://www.paybis.club',
        'https://www.paybis.club',
    ]
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/user', authMiddleware, usersRouter);
app.use('/api/reward', authMiddleware, rewardsRouter);

app.use('*', (req, res, next) => {
    const error = {
        status: 404,
        message: "Invalid endpoint!"
    };
    next(error);
});
app.use(errorHandler);
//connect to mongodb
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log(`Error connecting to mongodb: ${err}`);
    } else {
        console.log("Connected to MongoDB");
        const port = process.env.PORT || 8080;
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
});
