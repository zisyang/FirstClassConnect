'use strict';


exports = module.exports = function(io) {
  // Connect to Socket.io
  io.on('connection', function(socket){
      var chat = mongoose.model('Chat');

      // Create function to send status
      sendStatus = function(s){
          socket.emit('status', s);
      }

      // Get chats from mongo collection
      chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
          if(err){
              throw err;
          }

          // Emit the messages
          socket.emit('output', res);
      });

      // Handle input events
      socket.on('input', function(data){
          let name = data.name;
          let message = data.message;

          // Check for name and message
          if(name == '' || message == ''){
              // Send error status
              sendStatus('Please enter a name and message');
          } else {
              // Insert message
              chat.insert({name: name, message: message}, function(){
                  client.emit('output', [data]);
                  //
                  // // Send status object
                  // sendStatus({
                  //     message: 'Message sent',
                  //     clear: true
                  // });
              });
          }
      });
  });
}
