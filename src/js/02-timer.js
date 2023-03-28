import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateSelection = document.querySelector('#datetime-picker');
const start = document.querySelector('button[data-start]');
const daysLeft = document.querySelector('span[data-days]');
const hoursLeft = document.querySelector('span[data-hours]');
const minutesLeft = document.querySelector('span[data-minutes]');
const secondsLeft = document.querySelector('span[data-seconds]');
start.setAttribute('disabled', true);

const datePickerOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0].getTime());
    // console.log(Date.now());
    if (selectedDates[0].getTime() <= Date.now()) {
      alert('Please choose a date in the future!');
    } else {
      return selectedDates[0].getTime();
    }
  },
  onChange(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      start.removeAttribute('disabled');
    } else {
      start.setAttribute('disabled', true);
    }
  },
};

const chooseDate = flatpickr(dateSelection, datePickerOptions);

start.addEventListener('click', timerCountdownStart);

function timerCountdownStart() {
  let countDownInterval = null;
  const selectedDate = chooseDate.latestSelectedDateObj.getTime();
  const dateToConvert = convertMs(selectedDate - Date.now());
  updateClockData(dateToConvert);
  countDownInterval = setInterval(() => {
    const selectedDate = chooseDate.latestSelectedDateObj.getTime();
    if (selectedDate <= Date.now()) {
      clearInterval(countDownInterval);
      return;
    }
    const dateToConvert = convertMs(selectedDate - Date.now());
    updateClockData(dateToConvert);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClockData({ days, hours, minutes, seconds }) {
  daysLeft.textContent = days;
  hoursLeft.textContent = hours;
  minutesLeft.textContent = minutes;
  secondsLeft.textContent = seconds;
}

function pad(value) {
  return String(value).padStart(2, '0');
}
