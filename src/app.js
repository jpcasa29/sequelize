const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride =  require('method-override');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let peliculasRouter = require('./routes/peliculas');
let actoresRouter = require('./routes/actores');
let apiBuscadorRouter = require('./routes/apiBuscador');
let buscadorRouter = require('./routes/buscador');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/peliculas', peliculasRouter)
app.use('/actores', actoresRouter)
app.use('/buscador', buscadorRouter)
app.use('/api/buscador', apiBuscadorRouter)

app.listen(3000, function() {
  console.log('Servidor corriendo en el puerto 3000')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
