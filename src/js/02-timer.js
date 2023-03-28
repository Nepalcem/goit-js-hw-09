import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import * as refs from './timer-imports/timer-refs';
import { convertMs } from './timer-imports/date-convert';
import { datePickerOptions } from './timer-imports/date-picker-options';

refs.start.setAttribute('disabled', true);

const chooseDate = flatpickr(refs.dateSelection, datePickerOptions);

refs.start.addEventListener('click', timerCountdownStart);

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

function updateClockData({ days, hours, minutes, seconds }) {
  refs.daysLeft.textContent = days;
  refs.hoursLeft.textContent = hours;
  refs.minutesLeft.textContent = minutes;
  refs.secondsLeft.textContent = seconds;
}
