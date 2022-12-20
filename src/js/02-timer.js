import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('input#datetime-picker'),
  btn: document.querySelector('[data-start]'),
};

refs.btn.setAttribute('disabled', '');

let timerSet = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      timerSet = selectedDates[0].getTime();
      refs.btn.removeAttribute('disabled');
    }
  },
};

flatpickr(refs.input, options);
refs.btn.addEventListener('click', onStartBtnClick);

function onStartBtnClick(event) {
  refs.btn.setAttribute('disabled', '');

  const timerId = setInterval(() => {
    let timeDif = timerSet - Date.now();
    let timeObj = convertMs(timeDif);

    if (timeDif < 1000) {
      clearInterval(timerId);
    }

    const keys = Object.keys(timeObj);

    for (const key of keys) {
      document.querySelector(`[data-${key}]`).textContent = pad(timeObj[key]);
    }
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
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
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
