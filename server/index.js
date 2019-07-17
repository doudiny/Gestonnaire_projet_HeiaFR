const express = require('express');
var log = require('./app/util/log')
// passport is used for the authentication 
const passport = require('passport')
// gestionnaire de session via express
  //const session = require('express-session')
// permet de gêre les body en JSON facilement
const bodyParser = require('body-parser');
// module to handle environment variables
const env = require('dotenv').config();
// handlebar module used for views--> not needed
const exphbs = require('express-handlebars')
//----------------------------------------------------------------------
// instanciation de express
const app = express();
//----------------------------------------------------------------------
// Body parser configuration
// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//----------------------------------------------------------------------
// Passport strategy configuration
// session secret
  //app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// initialisation
app.use(passport.initialize());
// persistent login sessions
//app.use(passport.session());
//----------------------------------------------------------------------
// Models 
const models = require("./app/models");
// Routes
const authRoute = require('./app/routes/auth.js')(app, passport);
const projRoute = require('./app/routes/proj.js')(app, passport);
const listRoute = require('./app/routes/list.js')(app, passport);
const RespActionRoute = require('./app/routes/responsableAction')(app);
//load passport strategies
require('./app/config/passport/passport.js')(passport,models.User);
//----------------------------------------------------------------------
//Sync Database testing 
models.sequelize.sync().then(function () {
  log.log('info', 'Nice! Database looks fine on startup')
}).catch(function (err) {
  log.log('error', 'Something went wrong with the Database Update! ' + err )
});

//----------------------------------------------------------------------


// listening
module.exports = app.listen(process.env.PORT || 8090, () => console.log(`Listening on port ${process.env.PORT || 8090}!`));
