var dotEnv          = require('dotenv').config(),
    express         = require('express'),
    morgan          = require('morgan'),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    app             = express(),
    // path            = require('path'),
    // indexRouter     = require('./server/routes/index.js'),
    // apiAuthRouter   = require('./server/routes/api/auth.js'),
    // apiUsersRouter  = require('./server/routes/api/users.js'),
    ejs             = require("ejs");
