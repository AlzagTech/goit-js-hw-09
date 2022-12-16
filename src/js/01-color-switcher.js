const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
refs.stopBtn.setAttribute('disabled', '');

let timeId = null;

function onStartBtnClick(event) {
  refs.startBtn.setAttribute('disabled', '');
  refs.stopBtn.removeAttribute('disabled', '');

  timeId = setInterval(() => {
    refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function onStopBtnClick(event) {
  refs.startBtn.removeAttribute('disabled', '');
  refs.stopBtn.setAttribute('disabled', '');

  clearInterval(timeId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
