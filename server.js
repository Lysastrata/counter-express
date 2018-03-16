var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var count = 0;
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(session({secret: 'codingdojorocks'}));
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
  count += 1;
  req.session.num = count;
 res.render("index", {session: req.session});
})
app.get('/times', function(req, res) {
  count +=1;
  res.redirect('/');
})
app.get('/reset', function(req, res) {
  count =0;
  res.redirect('/');
})
// post route for adding a user
app.post('/users', function(req, res) {
 console.log("POST DATA", req.body);
 // This is where we would add the user to the database
 // Then redirect to the root route
 res.redirect('/');
})
// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
