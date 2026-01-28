import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePicker = document.querySelector('#datetime-picker');
const timerStartBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    userSelectedDate = selectedDates[0];

    const isPast = userSelectedDate < currentDate;

    if (isPast) {
      timerStartBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        transitionIn: 'fadeInRight',
        transitionOut: 'fadeOutRight',
        timeout: 5_000,
      });
    } else {
      if (intervalId === null) {
        timerStartBtn.disabled = false;
      }
    }
  },
};

flatpickr(datePicker, options);

const showflatpickrArr = flatpickr(datePicker, options);
console.log(showflatpickrArr.selectedDates);

const handleStartBtn = () => {
  if (!userSelectedDate) {
    return;
  }
  timerStartBtn.disabled = true;
  datePicker.disabled = true;
  intervalId = setInterval(() => {
    const currentDate = new Date();
    const difference = userSelectedDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(difference);

    if (difference <= 0) {
      clearInterval(intervalId);
      resetTimer();
      iziToast.success({
        title: 'Success',
        message: 'The time has come!',
        position: 'topRight',
        transitionIn: 'fadeInRight',
        transitionOut: 'fadeOutRight',
        timeout: 5_000,
      });
      return;
    }

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }, 1_000);
};

function resetTimer() {
  userSelectedDate = null;
  daysEl.textContent = '00';
  hoursEl.textContent = '00';
  minutesEl.textContent = '00';
  secondsEl.textContent = '00';
  datePicker.disabled = false;
}

timerStartBtn.addEventListener('click', handleStartBtn);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
