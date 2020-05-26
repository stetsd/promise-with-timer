

const PromiseWithTimer = require('../PromiseWithTimer')

{
  const promise = new PromiseWithTimer(
    resolve => setTimeout(resolve.bind(null, 'hello i am tree'), 100)
  );

  promise.then(console.log).catch(console.error);
  console.dir({promise});
}

{
  const promise = new PromiseWithTimer(resolve => {
    setTimeout(() => {
      resolve('hello i am boris');
    }, 10);
  });

  promise.cancel();
  promise.then(console.log).catch(console.log);
  console.dir({ promise });
}

{
  ;(async () => {
    try {

      await new PromiseWithTimer(resolve => {
        setTimeout(() => {
          resolve('Yeltsin was right')
        }, 2000);
      }, 1000);

    } catch (error) {

      console.error('\x1b[36m%s\x1b[0m', error);

    }

  })();

}