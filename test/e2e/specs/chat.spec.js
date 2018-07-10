const faker = require('faker');

let outgoingMessage = faker.random.words()

module.exports = {
  'send message test': function (browser) {
    browser
      .url('http://localhost:8080/chat')
      .waitForElementVisible('body', 2000)
      .setValue('#chat-message-area', outgoingMessage)
      .waitForElementVisible('button[name=submit-message-button]', 1000)
      .click('button[name=submit-message-button]')
      .pause(2000)
      .assert.containsText('.incoming-message', outgoingMessage)
      .end();
  }
};