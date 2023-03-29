import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', formHandler);

function formHandler(e) {
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;
  e.preventDefault();
  const firstDelay = Number(delay.value);
  const promiseStep = Number(step.value);
  const promisesAmount = Number(amount.value);
  let delayvalue = firstDelay;
  for (i = 1; i <= promisesAmount; i += 1) {
    createPromise(i, delayvalue)
      .then(value => Notiflix.Notify.success(value, { timeout: 10000 }))
      .catch(error => Notiflix.Notify.failure(error, { timeout: 10000 }));
    delayvalue += promiseStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
