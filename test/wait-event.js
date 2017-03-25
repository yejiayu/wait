const test = require('ava');

const wait = require('../');

test('wait ready', async (t) => {
  const { EventEmitter } = require('events');
  const event = new EventEmitter()

  setTimeout(function () {
    event.emit('ready', 'result')
  }, 1000);
  const result = await wait(event, 'ready');
  t.is(result, 'result')
})

test('wait timeout', async (t) => {
  const { EventEmitter } = require('events');
  const event = new EventEmitter()

  setTimeout(function () {
    event.emit('ready', 'result')
  }, 1000);

  try {
    await wait(event, 'ready', 2000);
  } catch (e) {
    t.is(e.name, 'TimeoutError')
  }
})
