export default {
  namespaced: true,
  state: {
    personalData: {
      name: '',
      email: ''
    }
  },
  mutations: {
    setPersonalData (state, payload) {
      state.personalData = payload
    }
  }
}
