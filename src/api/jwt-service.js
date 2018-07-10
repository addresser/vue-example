export default function (axios, jwtServiceURL, postRegisterPath, postLoginPath) {
  this.postLogin = function (data) {
    return axios.post(`${jwtServiceURL}${postLoginPath}`, data)
      .then(responce => {
        return responce.data.token
      })
      .catch((error) => {
        throw error.response.data
      })
  }

  this.postRegister = function (data) {
    //
  }
}
