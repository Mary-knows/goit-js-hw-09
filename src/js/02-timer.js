import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let deltaDate = null;
let timerId = null;
const refs = {
    inputData: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector('button[data-start]'),
    daysRef: document.querySelector('span[data-days]'),
    hoursRef: document.querySelector('span[data-hours]'),
    minutesRef: document.querySelector('span[data-minutes]'),
    secondsRef: document.querySelector('span[data-seconds]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

      const selectedDate = selectedDates[0].getTime();
      const currentDate = Date.now();
      deltaDate = selectedDate - currentDate;

      if (selectedDate < currentDate) {
          alert("Please choose a date in the future");
      } else {
          refs.startBtn.disabled = false;
      }
  },
};

flatpickr(refs.inputData, options);

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtnClick);



function onStartBtnClick() {

    timerId = setInterval(() => {
console.log(deltaDate)
        if (deltaDate < 0) {
            clearInterval(timerId);
            return
        }

        const normalDateView = convertMs(deltaDate);
        updateTimerFace(normalDateView);
        deltaDate -= 1000; 
    }, 1000);

    refs.startBtn.disabled = true;
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

function updateTimerFace({ days, hours, minutes, seconds }) {
    refs.daysRef.textContent = addLeadingZero(days);
    refs.hoursRef.textContent = addLeadingZero(hours);
    refs.minutesRef.textContent = addLeadingZero(minutes);
    refs.secondsRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}