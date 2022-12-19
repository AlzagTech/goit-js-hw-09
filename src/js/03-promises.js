import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  useIcon: false,
});

const resf = {
  formRef: document.querySelector('form'),
};

resf.formRef.addEventListener('submit', onFormSubmit);

let startDelay = 0;

function onFormSubmit(event) {
  event.preventDefault();

  amount = Number(event.currentTarget.amount.value);
  startDelay = Number(event.currentTarget.delay.value);
  delayStep = Number(event.currentTarget.step.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, startDelay)
      .then(result => console.log(result))
      .catch(error => console.log(error));
    startDelay += delayStep;
  }
}

function createPromise(position, delay) {
  return new Promise((reslove, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        reslove(
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
        );
      } else {
        reject(Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
}

function resetSettings(x, y, z) {
  x = 0;
}
