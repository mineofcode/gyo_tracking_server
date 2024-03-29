//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//service stuff
//udp listner

//var bodyParser = require("./udp-server");

var conf = require("gen").conf;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');

var jwt = require('express-jwt');
var rs = require("gen").res;

var mongo = require("../db/mongodbservice.js"); //socket server for instant message
mongo.start();

var socketserver = require("./socketserver.js"); //socket server for instant message
socketserver.io = io;
socketserver.start();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//console.log(path.join(__dirname.replace(/\\app\\bin/gi, ""), '\\www\\uploads'));

//###############################################################################################

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,App-Id,Password');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use('/images', express.static(__dirname.replace('app', "www").replace('bin', 'uploads')));

app.use('/images', express.static(__dirname.replace('app', "www").replace('bin', 'mobile')));

app.use(jwt({
    secret: 'abcd',
    credentialsRequired: false
}));

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        rs.resp(res, 401, "error : Invalid Token");
    }
});


app.use('/images', express.static(path.join(__dirname.replace(/\\app\\bin/gi, ""), '\\www\\uploads')));
// app.get('/chat', function(req, res) {
//     res.sendFile(__dirname.replace("\\bin", "") + '\\httpdocs\\index.html');
//     // res.send('<h1>Hello world</h1>');
// });

// ##############################################################################################	

var routes = require("../routes/routes.js")(app);
var schapi = require("../routes/schapi.js")(app);
var track = require("../routes/track.js")(app);

// ##############################################################################################

// If no route is matched by now, it must be a 404

app.use(function(req, res, next) {
    console.log(req.url);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// ##############################################################################################

// start API server

var expserver = server.listen(conf.server.port, conf.server.ip, function() {
    console.log("API Server is listening on port %s...", expserver.address().port);
});

// ##############################################################################################