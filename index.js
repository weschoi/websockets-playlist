var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, function() {
  console.log('Listening to requests on Port 4000');
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket) {
  // V The socket below refers to this particular socket between this server and the client that's sending the message
  socket.on('chat', function(data){
    // Data is the object that was received from the client
    // io.sockets refers to ALL the sockets that are connected to the server. This might not be a good thing because you only want to send the data to the clients that are connected on that same socket
    // .emit will emit something to each client in that same
    // Why 'chat' again?
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data + ' is typing...');
  })
})