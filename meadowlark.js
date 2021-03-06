var express = require('express');
//import from made module/library
var fortune = require('./lib/fortune.js');

var app = express();

//set up handlebars view engine
var handlebars = require('express-handlebars')
.create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars' );


app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
  next();
})

//routes go here.......

app.get('/', function(req, res){
  res.render('home')
  // res.type('text/plain');
  // res.send('Meadowlark Travel');

});

app.get('/about', function(req, res){
  res.render('about', {
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js'
  });
});

// routes for hood-river
app.get('/tours/hodd-river', function(req, res){
  res.render('tours/hood-river');
});
//rout for the form
app.get('/tours/request-group-rate', function(req, res){
  res.render('tours/request-group-rate');
});
//404 catch-all handeler (middleware)
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

//500 error handler (middleware)
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500')
});

// app.get('/about', function(req, res){
//   res.type('text/plain');
//   res.send('About Meadowlark Travel');
// });
//
// //custom 404 page
// app.use(function(req, res){
//   res.type('text/plain');
//   res.status(404);
//   res.send('404 - Not Found');
// });
//
// //custom 500 page
// app.use(function(err, req, res, next){
//   console.log(err.stack);
//   res.type('text/plain');
//   res.status(500);
//   res.send('500 - Server Error')
// });

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
  app.get('port') + ';press Ctrl-C to terminate.');
});

