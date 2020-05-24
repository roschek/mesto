class FormValidator {
constructor()
{}
/*

isValidate(input) {

  input.setCustomValidity(""); // устанавливаем свойсво validity.customError в false

  if (input.validity.valueMissing) {
    input.setCustomValidity(errorMessages.empty);
    return false
  }
  if (input.value.trim().length === 0) {
    input.setCustomValidity(errorMessages.empty);
    return false

  }
  if (input.validity.tooShort || input.validity.tooLong) {
    input.setCustomValidity(errorMessages.wrongLength);
    return false
  }
  if (input.validity.typeMismatch && input.type === 'url') {

    input.setCustomValidity(errorMessages.wrongUrl);
    return false
  }

  return input.checkValidity();
}

// вкл/выкл ошибки со слушателя
isFieldValid(input) {
  const errorForm = input.closest('form');
  const errorElem = errorForm.querySelector(`#${input.id}-error`);
  const valid = isValidate(input); // устанавливаем инпуту кастомные ошибки, если они есть.
  errorElem.textContent = input.validationMessage;

  return valid;
}

// вкл и выкл кнопки
setSubmitButtonState(button, state) {
  if (state) {
    button.removeAttribute('disabled');
    button.classList.add(`popup__button_valid`);
    button.classList.remove(`popup__button_invalid`)
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(`popup__button_invalid`);
    button.classList.remove(`popup__button_valid`);
  }
}

handlerInputForm(evt, submit) {
  isFieldValid(evt.target);

  const currentForm = evt.currentTarget;
  if (currentForm.checkValidity()) {

    setSubmitButtonState(submit, true);
  } else {
    setSubmitButtonState(submit, false);

  }
}

checkForm(form) {
  const submit = form.querySelector('.button');

  form.addEventListener('input', (evt) => handlerInputForm(evt, submit))
}

cleanError() {
  // Можно лучше
  // (element) => {...}
  collector.forEach(function (element) {
    element.textContent = '';
  })
}


cardValue() {
  const name = document.querySelector('.user-info__name').innerHTML;
  const profession = document.querySelector('.user-info__job').innerHTML;
  const { pers, description } = formEdit.elements
  pers.value = name;
  description.value = profession;
  submitFormEdit.removeAttribute('disabled');
  submitFormEdit.classList.add(`popup__button_valid`);
  submitForm.removeAttribute('disabled');
  submitForm.classList.add(`popup__button_valid`);
}

}

const collector = document.querySelectorAll('.error')
const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
}
const formEdit = document.forms.person;

// функция проверки
function 

const collector = document.querySelectorAll('.error')
const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
}
const formEdit = document.forms.person;


// вкл/выкл ошибки со слушателя
function isFieldValid(input) {
  const errorForm = input.closest('form');
  const errorElem = errorForm.querySelector(`#${input.id}-error`);
  const valid = isValidate(input); // устанавливаем инпуту кастомные ошибки, если они есть.
  errorElem.textContent = input.validationMessage;

  return valid;
}

// вкл и выкл кнопки
function setSubmitButtonState(button, state) {
  if (state) {
    button.removeAttribute('disabled');
    button.classList.add(`popup__button_valid`);
    button.classList.remove(`popup__button_invalid`)
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(`popup__button_invalid`);
    button.classList.remove(`popup__button_valid`);
  }
}
function handlerInputForm(evt, submit) {
  isFieldValid(evt.target);

  const currentForm = evt.currentTarget;
  if (currentForm.checkValidity()) {

    setSubmitButtonState(submit, true);
  } else {
    setSubmitButtonState(submit, false);

  }
}

function checkForm(form) {
  const submit = form.querySelector('.button');

  form.addEventListener('input', (evt) => handlerInputForm(evt, submit))
}

function cleanError() {
  // Можно лучше
  // (element) => {...}
  collector.forEach(function (element) {
    element.textContent = '';
  })
}

function cardValue() {
  const name = document.querySelector('.user-info__name').innerHTML;
  const profession = document.querySelector('.user-info__job').innerHTML;
  const { pers, description } = formEdit.elements
  pers.value = name;
  description.value = profession;
  submitFormEdit.removeAttribute('disabled');
  submitFormEdit.classList.add(`popup__button_valid`);
  submitForm.removeAttribute('disabled');
  submitForm.classList.add(`popup__button_valid`);
}
*/
