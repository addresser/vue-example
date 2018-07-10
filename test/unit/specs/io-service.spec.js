import plugins from '@/plugins'

let ioService, jwtToken, clientSocket

describe('io-service.js', () => {
  before(() => {
    jwtToken = 'jwtToken'
  })

  before(() => {
    ioService = plugins.injector.get('ioService')
  })

  after(() => {
    clientSocket.close()
  })

  describe('when given jwt token to connect method', () => {
    it('should connect to chat namespace', (done) => {
      clientSocket = ioService.connect(jwtToken)

      clientSocket.on('connect', () => {
        expect(clientSocket.nsp).to.be.string('/chat')

        done()
      })
    })
    it('should handle login event', (done) => {
      clientSocket = ioService.connect(jwtToken)

      clientSocket.on('login', (userData) => {
        expect(userData).to.have.keys('name', 'email')

        done()
      })
    })
  })

  describe('when not given jwt token to connect method', () => {
    it('should handle error event', (done) => {
      clientSocket = ioService.connect()

      clientSocket.on('error', (error) => {
        expect(error).to.be.string('invalid token')

        done()
      })
    })
  })
})
