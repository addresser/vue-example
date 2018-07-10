import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import * as faker from 'faker'

import plugins from '@/plugins'

let jwtService, axiosMock, correctInput, incorrectInput,
  verifyingValue, returnValue, errorMessages

describe('jwt-service.js', () => {
  before(() => {
    correctInput = {
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password()
    }
    incorrectInput = {
      email: faker.random.word(),
      password: faker.random.words()
    }
    returnValue = 'jwtToken'
    errorMessages = [
      { param: 'email', msg: faker.random.words() },
      { param: 'password', msg: faker.random.words() }
    ]

    axiosMock = new AxiosMockAdapter(axios)
    axiosMock.onPost(
      `${plugins.injector.get('jwtServiceURL')}${plugins.injector.get('postLoginPath')}`
    ).reply(config => {
      if (JSON.parse(config.data).email === correctInput.email) return [200, { token: returnValue }]

      return [422, errorMessages]
    })
  })

  before(() => {
    jwtService = plugins.injector.get('jwtService')
  })

  describe('when given correct input data to postlogin', () => {
    it('should return jwt token', async () => {
      try {
        verifyingValue = await jwtService.postLogin(correctInput)

        expect(verifyingValue).to.be.string(returnValue)
      } catch (e) {
        console.log(e)
      }
    })
  })

  describe('when given incorrect input data to postlogin', () => {
    it('should return error messages', async () => {
      try {
        await jwtService.postLogin(incorrectInput)
      } catch (e) {
        expect(e).to.equal(errorMessages)
      }
    })
  })
})
