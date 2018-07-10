let http = require('http')
let faker = require('faker')
let socketIO = require('socket.io')

let app, io, chat

const createSocketIOServer = function (args, config, logger) {
  app = http.createServer()

  io = socketIO()

  io.attach(app)

  chat = io.of('/chat')

  chat.use((socket, next) => {
    if(socket.handshake.query.token === 'undefined') {
      return next(new Error('invalid token'))
    }

    next()
  })

  chat.on('connection', (socket) => {
    socket.emit('login', {
      name: faker.internet.userName(),
      email: faker.internet.email().toLowerCase()
    })

    socket.on('message', (message) => {
      socket.emit('message', message)
    })
  })

  app.listen(config.socketIOServer.port);
}

module.exports = {
  'framework:socket-io-server': ['factory', createSocketIOServer]
}