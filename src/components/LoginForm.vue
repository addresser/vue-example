<template>
  <div>
    <div class="row justify-content-center mt-5 mb-4">
      <span>Log In to Existing Account</span>
    </div>
    <form
        id="login-form"
        @submit.prevent="onSubmit">
      <div
          class="form-group row justify-content-center">
        <div class="col-7 col-md-6 col-lg-5 col-xl-4">
          <input
              :class="['form-control', { 'is-invalid': errors.has('email') }]"
              id="email"
              name="email"
              v-model.trim="email.value"
              v-validate.disable="email.rules"
              placeholder="Email">
          <div
              class="invalid-feedback"
              v-show="errors.has('email')">{{ errors.first('email') }}</div>
        </div>
      </div>
      <div class="form-group row justify-content-center">
        <div class="col-7 col-md-6 col-lg-5 col-xl-4">
          <input
              :class="[ 'form-control', { 'is-invalid': errors.has('password') }]"
              id="password"
              name="password"
              v-model.trim="password.value"
              v-validate.disable="password.rules"
              placeholder="Password">
          <div
              class="invalid-feedback"
              v-show="errors.has('password')">{{ errors.first('password') }}</div>
        </div>
      </div>
      <div class="form-group row justify-content-center">
        <div class="col-7 col-md-6 col-lg-5 col-xl-4">
          <button
              class="btn w-100"
              type="submit"
              name="login-button">Log In</button>
        </div>
      </div>
      <div>
        <div
          class="form-group row justify-content-center">
          <span class="col-auto">or</span>
        </div>
        <div class="form-group row justify-content-center">
          <div class="col-auto">
            <button
                class="btn"
                type="submit"
                name="new-account-button">Create New Account</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  dependencies: [
    'jwtService'
  ],
  data: function () {
    return {
      email: {
        value: '',
        rules: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        rules: {
          required: true,
          alpha_dash: true,
          min: 5,
          max: 25
        }
      }
    }
  },
  methods: {
    onSubmit ($event) {
      this._validate()
    },
    _validate () {
      this.$validator.validate()
        .then(result => {
          if (result) this._postLogin()
        })
    },
    _postLogin () {
      this.jwtService.postLogin({
        email: this.email.value,
        password: this.password.value
      })
        .then((token) => {
          localStorage.jwtToken = token

          this.$router.push('/chat')
        })
        .catch((errorMessages) => {
          errorMessages.forEach((error) => {
            this.errors.add({
              field: error.param,
              msg: error.msg
            })
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
