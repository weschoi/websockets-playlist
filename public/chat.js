// This makes the connection on the client side
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
// Emit events

btn.addEventListener('click', function(){
  
  // We emit an event called 'chat' to the server and send the object in the second argument to the server
  // Look over socket.on in the server that receives the 'chat' event
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});


// //Listen for events
socket.on('chat', function(data) {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
})


message.addEventListener('keypress', function() {
  socket.emit('typing', handle.value)
});

socket.on('typing', function(data) {
  feedback.innerHTML = '<p><em>' + data + '</em></p>';
})

// socket.emit()