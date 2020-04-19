const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const logsRouter = require('../server/routes/logsRute');
const projectsRouter = require('../server/routes/projectsRute');
const tokensRoter = require('../server/routes/tokensRoute');
const functionsRoute = require('../server/routes/functionsRoute');
const directoryRoute = require('../server/routes/directoryRoute');

const app = express();

// Mongoose conectionvaria
mongoose.connect(
  `${process.env.DB_HOST}backler?authSource=admin`,
  {
    useNewUrlParser: true, 
    useCreateIndex: true
  }, (err) => {
    if(err){
      console.log(err)
    } 
    console.log('Successfully conected')
  }
)

// view engine setup
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('dist'));


// Routes of controllers of schemas
var url = '/backler/api'
app.use(`${url}/logs`, logsRouter);
app.use(`${url}/projects`, projectsRouter);
app.use(`${url}/tokens`, tokensRoter);
app.use(`${url}/functions`, functionsRoute);
app.use(`${url}/directory`, directoryRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
