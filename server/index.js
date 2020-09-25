const app = require('express'),
  http = require('http').createServer(app),
  io = require('socket.io')(http)

io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
})

http.listen(3001, () => {
  console.log('listening on port 3001')
})
