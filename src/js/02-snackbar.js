import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', evt => {
  evt.preventDefault();
  submitBtn.disabled = true;

  const delayInput = document.querySelector('input[name="delay"]');
  delayInput.disabled = true;
  const stateInput = document.querySelector('input[name="state"]:checked');
  const delay = Number(delayInput.value);
  const promiseResultOption = stateInput.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      delayInput.value = '';

      if (promiseResultOption === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${value}ms`,
        position: 'topCenter',
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
        timeout: 5_000,
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Failure',
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topCenter',
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
        timeout: 5_000,
      });
    })
    .finally(() => {
      submitBtn.disabled = false;
      delayInput.disabled = false;
    });
});
