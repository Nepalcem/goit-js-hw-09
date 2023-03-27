const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
let timerID = null;

start.addEventListener('click', timedColorChange);
stop.addEventListener('click', timedColorStop);

function onClickBodyColorChange() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
  start.setAttribute('disabled', true);
}

function timedColorStop() {
  clearInterval(timerID);
  start.removeAttribute('disabled');
}

function timedColorChange() {
  onClickBodyColorChange();
  timerID = setInterval(onClickBodyColorChange, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
