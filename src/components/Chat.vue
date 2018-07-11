<template>
  <div>
    <div class="row justify-content-center mt-5 mb-4">
      <span
          v-if="personalData.name">
        Welcome, {{ personalData.name }}!
      </span>
    </div>
    <form
        id="chat-form"
        @submit.prevent="onSubmit">
      <div class="form-group row justify-content-center">
        <div class="col-7 col-md-6 col-lg-5 col-xl-4">
          <textarea
            id="chat-message-area"
            class="form-control"
            rows="5"
            v-model="outgoingMessage"
            placeholder="Enter your message.">
          </textarea>
        </div>
      </div>
      <div class="form-group row justify-content-center">
        <div class="col-7 col-md-6 col-lg-5 col-xl-4">
          <button
              class="btn w-100"
              type="submit"
              name="submit-message-button">
            Send Message
          </button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-7 col-md-6 col-lg-5 col-xl-4">
          <div
              class="incoming-message"
              v-for="(incomingMessage, index) in incomingMessages"
              v-bind:key="index">
            {{ incomingMessage }}
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  dependencies: [
    'ioService'
  ],
  data: function () {
    return {
      chatSocket: null,
      outgoingMessage: '',
      incomingMessages: []
    }
  },
  computed: {
    ...Vuex.mapState('user', ['personalData'])
  },
  methods: {
    onSubmit () {
      this.chatSocket.send(this.outgoingMessage)

      this.outgoingMessage = ''
    },
    onMessage (msg) {
      this.incomingMessages.push(msg)
    },
    onConnect () {
      //
    },
    onLogin (userData) {
      this.setPersonalData(userData)
    },
    onError (err) {
      //
    },
    _addEventListener () {
      this.chatSocket.on('error', this.onError)
      this.chatSocket.on('connect', this.onConnect)
      this.chatSocket.on('login', this.onLogin)
      this.chatSocket.on('message', this.onMessage)
    },
    ...Vuex.mapMutations('user', ['setPersonalData'])
  },
  created () {
    this.chatSocket = this.ioService.connect(localStorage.jwtToken)

    this._addEventListener()
  }
}
</script>

<style scoped>
</style>
