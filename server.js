var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var path = require('path');

app.use( express.static('dist'));

app.get('/items', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/item/:id', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

server.listen(9000, 'localhost');
server.on('listening', function() {
    console.log('El servidor express esta escuchando');
});