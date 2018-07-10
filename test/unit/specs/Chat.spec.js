import Vuex from 'vuex'

import delay from 'delay'
import * as faker from 'faker'
import MockVueRouter from 'mock-vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import Chat from '@/components/Chat.vue'
import plugins from '@/plugins'

let wrapperChat, localVue, store, routerMock, userModuleMock,
  outgoingMessage

describe('Chat.vue', () => {
  beforeEach(() => {
    outgoingMessage = faker.random.words()

    routerMock = MockVueRouter()

    userModuleMock = {
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

    sinon.spy(routerMock.$router, 'push')
    sinon.spy(userModuleMock.mutations, 'setPersonalData')

    localStorage.jwtToken = faker.random.word()
  })

  beforeEach(() => {
    localVue = createLocalVue()

    localVue.use(Vuex)

    for (let plugin in plugins) {
      localVue.use(plugins[plugin])
    }

    store = new Vuex.Store({
      strict: 'testing',
      modules: {
        user: userModuleMock
      }
    })
  })

  beforeEach(() => {
    wrapperChat = shallowMount(Chat, {
      localVue,
      store,
      mocks: {
        $router: routerMock.$router
      }
    })
  })

  it('should render correct contents', async () => {
    await delay(500)

    expect(wrapperChat.html()).to.be.a('string')
    expect(wrapperChat.html()).to.have.string(wrapperChat.vm.personalData.name)
  })

  describe('when user submit message', () => {
    it('should render incoming message', async () => {
      wrapperChat.find('#chat-message-area').element.value = outgoingMessage
      wrapperChat.find('#chat-message-area').trigger('input')

      wrapperChat.find('#chat-form').trigger('submit')

      await delay(500)

      expect(wrapperChat.find('.incoming-message').html()).to.have.string(outgoingMessage)
    })
  })
})
