import Vuex from 'vuex'

import * as faker from 'faker'

import user from '@/store/modules/user'

let testValue, store

describe('LogInForm.vue', () => {
  before(() => {
    store = new Vuex.Store({
      strict: 'testing',
      modules: {
        user
      }
    })
  })

  describe('when run mutations', () => {
    it('should set personal data in store', () => {
      testValue = {
        email: faker.internet.email(),
        name: faker.internet.userName()
      }

      store.commit('user/setPersonalData', testValue)

      expect(store.state.user.personalData).to.be.equal(testValue)
    })
  })
})
