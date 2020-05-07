const buttonForm =document.querySelector('.popup__button');
const buttonFormEdit = document.querySelector('.button__popup-edit');
const form = document.forms.new;
const formEdit = document.forms.person;
const nick = document.querySelector('#name');
const link = document.querySelector('#link');
const pers = document.querySelector('#pers');
const description = document.querySelector('#description');

nick.addEventListener('input', handleValidate);
link.addEventListener('input', handleValidate);
pers.addEventListener('input', handleValidate);
description.addEventListener('input', handleValidate);

buttonForm.addEventListener('click', sendForm);
buttonFormEdit.addEventListener('click', sendForm);

function handleValidate(event) {
  resetError(event.target);
  validate(event.target);
}

function validate(element) {
  const errorElement = document.querySelector(`#error-${element.id}`);

  if (!element.checkValidity()) {
    errorElement.textContent = element.validationMessage;
    activateError(errorElement);
    return false;
  } 
  return true;
}

function activateError(element){
  element.insertAdjacentHTML(afterBegin,'<span>fsdfgv</span>');
}

function resetError(element) {
  element.parentNode.classList.add('error-hidden');
  element.textContent = '';
}

function sendForm(event) {
  event.preventDefault();

  const inputs = Array.from(form.elements);

  let isValidForm = true;

  inputs.forEach((elem) => {
    if (elem.id !== submit.id) {
      if (!validate(elem)) isValidForm = false;
    }
  });

  if (isValidForm) {
    console.log('success!');
    document.querySelector('#success-message').classList.add('success-message__visible');
  } else {
    console.log('Form is still not validated');
  }
}


//включение кнопки
function setSubmitButtonStage(button){
  button.removeAttribute('disabled');
}

