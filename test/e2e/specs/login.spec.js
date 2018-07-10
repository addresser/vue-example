const faker = require('faker');

module.exports = {
  'login test': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 2000)
      .setValue('#email', faker.internet.email().toLowerCase())
      .setValue('#password', faker.internet.password())
      .waitForElementVisible('button[name=login-button]', 1000)
      .click('button[name=login-button]')
      .pause(2000)
      .assert.containsText('#chat-welcome-header', 'Welcome')
      .end();
  },

  'error login test': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 2000)
      .setValue('#email', faker.random.word())
      .setValue('#password', faker.random.words())
      .waitForElementVisible('button[name=login-button]', 1000)
      .click('button[name=login-button]')
      .pause(2000)
      .assert.visible('.invalid-feedback')
      .end();
  }
};