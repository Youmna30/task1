const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/Users');
const problemRoutes = require('./routes/Problems');
const solutionRoutes = require('./routes/Solutions');

mongoose.connect('mongodb+srv://root:'
+process.env.MONGO_ATLAS_PW+
'@task1-htnuc.mongodb.net/test?retryWrites=true'
);
mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes which should handle the requests
app.use('/user',userRoutes);
app.use('/problem',problemRoutes);
app.use('/solution',solutionRoutes);


// this to handle if the url in the first argument
// in use isn't found so it will go to this func
app.use((req, res , next) => {
  const error = new Error('Not found');
  error.status= 404;
  next(error);
});
//this to print out the erros that come from the
//above function.
app.use((error,req, res , next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
});
module.exports = app;
