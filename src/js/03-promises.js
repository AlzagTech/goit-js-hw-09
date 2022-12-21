import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  useIcon: false,
});

const resf = {
  form: document.querySelector('form'),
};

resf.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const { amount, delay, step } = event.target;

  let startDelay = Number(delay.value);
  const amountValue = Number(amount.value);
  const delayStep = Number(step.value);

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, startDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    startDelay += delayStep;
  }
}

function createPromise(position, delay) {
  return new Promise((reslove, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        reslove({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
