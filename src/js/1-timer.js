
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const inputPicker = document.querySelector('input[type="text"]');
const startButton = document.querySelector('button[data-start');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');


let userSelectedDate = null;
let timerId = null;


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

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    startButton.disabled = true;
    inputPicker.disabled = true;

    const intervalId = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = userSelectedDate - currentTime;
        if (timeDiff <= 0) {
            clearInterval(intervalId);
            updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            inputPicker.disabled = false;
            return;
        }
        
        updateTimer(convertMs(timeDiff));

    }, 1000);
};


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      if (userSelectedDate < new Date()) {
         iziToast.error({
            title: 'Error',
             message: 'Please choose a date in the future',
             position: "topCenter",
         });
          startButton.disabled = true;
      } else {
          startButton.disabled = false;
      }
  },
};

flatpickr(inputPicker, options);
startButton.disabled = true;

startButton.addEventListener('click', startTimer);



