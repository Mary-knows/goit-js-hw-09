
const NOTIFICATION_DELAY = 1000;
let intervalId = null;
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}


refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
refs.stopBtn.disabled = true;


function onStartBtnClick() {  
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, NOTIFICATION_DELAY);

    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
} 

function onStopBtnClick() {
    clearInterval(intervalId);

    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}