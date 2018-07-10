import axios from 'axios'
import io from 'socket.io-client'

export default {
  jwtServiceURL: 'http://localhost:3004',
  postRegisterPath: '/register',
  postLoginPath: '/login',

  ioServiceURL: 'http://localhost:3010',
  ioServicePath: '/socket.io',
  ioChatNamespace: '/chat',

  io: io,
  axios: axios
}
