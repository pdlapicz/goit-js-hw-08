const form = document.querySelector('.feedback-form');

const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

window.addEventListener('load', () => {
  const savedState = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedState) {
    emailInput.value = savedState.email || '';
    messageTextarea.value = savedState.message || '';
  }
});

const saveFormState = _.throttle(() => {
  const currentState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(currentState));
}, 500);

form.addEventListener('input', saveFormState);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  //zatrzymanie strony
  if (emailInput.value === '' || messageTextarea.value === '') {
    console.log('Fill all of fields before submit!');
  } else {
    console.log('Form submited!', {
      email: emailInput.value,
      message: messageTextarea.value,
    });
    localStorage.removeItem('feedvack-form-state');
    form.requestFullscreen();
  }
});
