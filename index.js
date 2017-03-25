'use strict';

class CustomError extends Error {
  constructor(name, msg) {
    super(msg);
    this.name = name;
  }
}

module.exports = function wait(obj, event, timeout) {
  return new Promise((resolve, reject) => {
    const done = event === 'error' ? reject : resolve;
    let cancelId = null;

    function cb(...args) {
      if (cancelId) {
        clearTimeout(cancelId);
      }

      done(...args);
    }

    if (typeof timeout === 'number') {
      cancelId = setTimeout(() => {
        obj.removeListener(event, cb);
        return reject(new CustomError('TimeoutError', `${event} timeout`));
      }, timeout);
    }

    obj.once(event, cb);
  });
}
