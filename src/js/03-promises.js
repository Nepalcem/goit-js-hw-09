const form = document.querySelector('.form');
// console.log(form.elements);
const { delay, step, amount } = form.elements;
delay.value = 0;
step.value = 0;
amount.value = 0;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
