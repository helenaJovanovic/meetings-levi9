require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const User = require("./model/user");
const reservation = require("./model/meeting")
var cors = require('cors')


var meetingRouter = require('./routes/meetingRoute');
var usersRouter = require('./routes/userRoute');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/meetings/', meetingRouter);

app.use('/users/', usersRouter);

//Default ruta ako nista od gore nije trazeno
app.use("*", (req, res) => {
    res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "Doesn't exist"
        }
    });
});

module.exports = app;