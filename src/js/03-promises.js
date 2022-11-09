
const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onBtnClick);

function onBtnClick(evt) {
  evt.preventDefault();

  let delay = Number(formRef.delay.value);
  const step = Number(formRef.step.value);
  const amount = Number(formRef.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onError);
    delay += step;
  }
}


function createPromise(position, delay) {
  
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
    });
}

function onSuccess(result) {
    console.log(result);
  }

function onError(error) {
    console.log(error);
  }