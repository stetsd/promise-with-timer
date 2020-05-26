'use strict';

class PromiseWithTimer extends Promise {
  constructor(exec, time) {
    super((resolve, reject) => {
      let timer = null

      if (+time > 0) {
        timer = setTimeout(reject.bind(null, 'caught timeout of promise'), time)
      }

      exec(val => {
        if (this.canceled) {
          reject(new Error("canceled promise"))
        }

        timer && clearTimeout(timer)

        resolve(val)
      }, reject)
    })
    this.canceled = false
  }

  cancel() {
    this.canceled = true;
  }
}

module.exports = PromiseWithTimer;
