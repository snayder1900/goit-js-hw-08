import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');


const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500); 


const loadFormState = () => {
  const storedState = localStorage.getItem('feedback-form-state');
  if (storedState) {
    const formState = JSON.parse(storedState);
    emailInput.value = formState.email;
    messageTextarea.value = formState.message;
  }
};


document.addEventListener('DOMContentLoaded', loadFormState);


emailInput.addEventListener('input', saveFormState);
messageTextarea.addEventListener('input', saveFormState);


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formState = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (formState) {
    console.log('Valores del formulario enviados:', formState);

    localStorage.removeItem('feedback-form-state');
    emailInput.value = '';
    messageTextarea.value = '';
  }
});

