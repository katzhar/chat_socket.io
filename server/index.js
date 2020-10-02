require('dotenv/config');
const app = require('express'),
  http = require('http').createServer(app),
  jwt = require('jsonwebtoken'),
  io = require('socket.io')(http);

io.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    const token = socket.handshake.query.token;
    jwt.verify(token.toString(), process.env.SECRET_KEY, (err, decoded) => {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      next();
    });
  }
  else {
    next(new Error('Authentication error'));
  }
})
  .on('connection', (socket) => {
    socket.on('message', ({ name, message }) => {
      io.emit('message', { name, message })
    })
  });

http.listen(3001, () => {
  console.log('listening on port 3001')
})
