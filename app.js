var app = require('express')()
var bodyparser = require('body-parser')
var server = require('http').Server(app);
var io = require('socket.io')(server);
var cors = require('cors')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(cors())

app.get('/chat', function(req , res){
    res.sendFile(__dirname+ '/index.html') 
})

const port = process.env.PORT || 3000
io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        console.log('message: ' + msg);        
      });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

server.listen(port, function(){
    console.log('listening on *: '+port);
});

