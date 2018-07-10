export default function (io, ioServiceURL, ioServicePath, ioChatNamespace) {
  this.connect = function (jwtToken) {
    return io(`${ioServiceURL}${ioChatNamespace}`, {
      path: ioServicePath,
      query: {
        token: jwtToken
      }
    })
  }
}
