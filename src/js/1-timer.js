
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const inputPicker = document.querySelector('input[type="text"]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
  },
};

flatpickr(inputPicker, options);



