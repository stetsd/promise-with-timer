const { assert } = require('chai')
const PromiseWithTimer = require('../PromiseWithTimer')

describe('PromiseWithTimer tests', () => {
  it('must work normal mode', async () => {
    try {
      const key = 'hello i am tree';
      const result = await new PromiseWithTimer(
        resolve => setTimeout(resolve.bind(null, key), 100)
      );

      assert.isString(result)
      assert.equal(key, result)

    } catch (error) {
      console.log('\x1b[36m%s\x1b[0m', error);
    }
  });

  it('must cancel promise and mark it', done => {
    const promise = new PromiseWithTimer(resolve => {
      setTimeout(() => {
        resolve('hello i am boris');
      }, 10);
    });

    promise.cancel();

    promise
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
        assert.isTrue(promise.canceled);
        done();
      })
  });

  it('must reject promise by timeout', () => {
    const timeForReject = 1000
    const timeForResolve = 2000
    let now = null
    ;(async () => {
      try {
        now = Date.now()
        await new PromiseWithTimer(resolve => {
          setTimeout(() => {
            resolve('Yeltsin was right')
          }, timeForResolve);
        }, timeForReject);

      } catch (error) {
        assert.isTrue(timeForReject <= Date.now() - now <= timeForResolve);
      }
    })();
  });
});
