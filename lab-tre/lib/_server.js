'use strict';

const net = require('net');
const EE  = require('events').EventEmitter;

exports = module.exports = {};


let serverPort = 3000;
let pool = {};
pool.users = {};

pool.ee = new EE();
pool.ee.on('register', function(socket){
  var newClient = new Client(socket);
  pool.users[newClient.id] = newClient;

  console.log(newClient.nickname + ' connected to the server.');
  socket.write('Welcome to the chat ' + newClient.nickname + '\r\n');
  socket.pipe(process.stdout);
});

function Client(socket) {
  this.id = socket.remotePort;
  this.socket = socket;
  this.nickname = 'Guest';

  socket.on('end', function(){
    console.log(this.nickname + ' disconnected from the server');
    pool.users.splice(pool.users.indexOf(socket), 1);
  });

  socket.on('data', function(data){
    let result = this.nickname + ': ' + data;
    Object.keys(pool.users).forEach(function(clientId) {
      if (pool.users[clientId] !== socket)
        pool.users[clientId].socket.write(result);
      if (data == 'END\r\n')
        socket.end();
    });
  }.bind(this));
}

exports.startServer = function startServer(){
  let server = net.createServer();

  server.on('connection', function(socket){
    pool.ee.emit('register', socket);
  });

  server.listen(serverPort, function(){
    console.log('Server is running...');
  });
};
