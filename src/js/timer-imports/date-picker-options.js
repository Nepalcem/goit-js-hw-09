import * as refs from './timer-refs';
export const datePickerOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      alert('Please choose a date in the future!');
    } else {
      return selectedDates[0].getTime();
    }
  },
  onChange(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      refs.start.removeAttribute('disabled');
    } else {
      refs.start.setAttribute('disabled', true);
    }
  },
};
