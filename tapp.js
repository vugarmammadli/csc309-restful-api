// An example express server implementing a REST API


var express = require('express');
var routes = require('./routes/routes');
var bodyParser = require('body-parser');


var app = express();

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));


// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Get the index page:
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.get('/applicants', routes.getApplicants);

app.post('/applicants', routes.addNewApplicant);

app.delete('/applicants', routes.removeApplicant);

app.get('/courses', routes.getCourses);


// start the server
app.listen(3000);
console.log('Listening on port 3000');