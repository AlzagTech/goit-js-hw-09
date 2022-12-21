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
  setDisabledAttr(refs.startBtn, refs.stopBtn);

  timeId = setInterval(() => {
    refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function onStopBtnClick(event) {
  setDisabledAttr(refs.stopBtn, refs.startBtn);
  clearInterval(timeId);
}

function setDisabledAttr(elRefForSetAttr, elRefForRemoveAttr) {
  elRefForSetAttr.setAttribute('disabled', '');
  elRefForRemoveAttr.removeAttribute('disabled', '');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
