import jwtService from '@/api/jwt-service'
import ioService from '@/api/io-service'

export default {
  jwtService: {
    service: jwtService,
    dependencies: [
      'axios',
      'jwtServiceURL',
      'postRegisterPath',
      'postLoginPath'
    ]
  },
  ioService: {
    service: ioService,
    dependencies: [
      'io',
      'ioServiceURL',
      'ioServicePath',
      'ioChatNamespace'
    ]
  }
}
