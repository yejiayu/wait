# wait-event
> wait event

## Install
```js
$ npm i wait-event --save
```

## Usage
```js
const wait = require('wait-event');
const { EventEmitter } = require('events');
const event = new EventEmitter()

setTimeout(() => {
  event.emit('ready', 'ready')
}, 4000)

setTimeout(() => {
  event.emit('timeout')
}, 6000)

async () => {
  const result = await wait(event, 'ready')

  try {
    await wait(event, 'timeout', 5000)
  } catch (e) {
    console.log(e.name); // TimeoutError
  }

  // always.....
  await wait(event, 'always-wait')
}
```
