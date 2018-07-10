import * as faker from 'faker'
import flushPromises from 'flush-promises'
import MockVueRouter from 'mock-vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import plugins from '@/plugins'
import LoginForm from '@/components/LoginForm.vue'

let wrapperLoginForm, localVue, store,
  jwtServiceMock, routerMock, correctInput, incorrectInput

describe('LogInForm.vue', () => {
  before(() => {
    correctInput = {
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password()
    }
    incorrectInput = {
      email: faker.random.word(),
      password: faker.random.words()
    }
    routerMock = MockVueRouter()
    jwtServiceMock = {
      postLogin: function () {
        return new Promise((resolve) => {
          resolve('jwtToken')
        })
      }
    }

    sinon.spy(routerMock.$router, 'push')
    sinon.spy(jwtServiceMock, 'postLogin')
  })

  before(() => {
    localVue = createLocalVue()

    for (let plugin in plugins) {
      if (plugin === 'injector') continue

      localVue.use(plugins[plugin])
    }
  })

  before(() => {
    wrapperLoginForm = shallowMount(LoginForm, {
      localVue,
      store,
      mocks: {
        $router: routerMock.$router,
        jwtService: jwtServiceMock
      }
    })
  })

  it('should render correct contents', () => {
    expect(wrapperLoginForm.html()).to.be.a('string')
  })

  describe('when user submit correct login data', () => {
    before(async () => {
      wrapperLoginForm.find('#email').setValue(correctInput.email)
      wrapperLoginForm.find('#password').setValue(correctInput.password)

      wrapperLoginForm.find('#login-form').trigger('submit')

      await flushPromises()
    })

    it('should make request to log in', async () => {
      expect(wrapperLoginForm.vm.jwtService.postLogin.calledWith(correctInput)).to.be.true
    })
    it('should redirect', async () => {
      expect(wrapperLoginForm.vm.$router.push.calledWith('/chat')).to.be.true
    })
  })

  describe('when user sent incorrect login data', () => {
    before(async () => {
      wrapperLoginForm.find('#email').setValue(incorrectInput.email)
      wrapperLoginForm.find('#password').setValue(incorrectInput.password)

      wrapperLoginForm.find('#login-form').trigger('submit')

      await flushPromises()
    })

    it('should render error messages', async () => {
      expect(wrapperLoginForm.find('.invalid-feedback').isVisible()).to.be.true
    })
  })
})
