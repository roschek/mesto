const submitForm = document.querySelector('.popup__button');
const submitFormEdit = document.querySelector('.button__popup-edit');
const form = document.forms.new;
const formEdit = document.forms.person;
const nick = document.querySelector('#name');
const link = document.querySelector('#link');
const pers = document.querySelector('#pers');
const description = document.querySelector('#description');

const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
}

// функция проверки
function isValidate(input) {

  input.setCustomValidity(""); //устанавливаем свойсво validity.customError в false

  if (input.validity.valueMissing) {
    input.setCustomValidity(errorMessages.empty);
    return false
  }

  if (input.validity.tooShort || input.validity.tooLong) {
    input.setCustomValidity('Должно быть от 2 до 30 символов');
    return false
  }
  return input.checkValidity();
}

//вкл/выкл ошибки со слушателя
function isFieldValid(input) { 
  console.log(input.validity);
  const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
  const valid = isValidate(input); // устанавливаем инпуту кастомные ошибки, если они есть.
  errorElem.textContent = input.validationMessage;
  return valid;
}

//проверки формы на валидность
function isFormValid(form) { //validateForm
  const inputs = [...form.elements];
  
  let valid = true;
  
  inputs.forEach((input) => {
    if (input.type !== 'submit' && input.type !== 'button') {
      if (!isFieldValid(input)) valid = false;
    }
  });
  
  return valid;
}


//вкл и выкл кнопки
function setSubmitButtonState(button, state) {
  if (state) {
      button.removeAttribute('disabled');
      
  } else {
      button.setAttribute('disabled', true);
      
  }
}
function sendForm(evt) {
  evt.preventDefault();
  const currentForm = evt.target;
  const isValid = isFormValid(currentForm);

  if (isValid) {
    console.log('Форма успешно добавлена!');
    evt.target.reset();
  } else {
    console.log('Форма не прошла валидацию ');
  }
}

function handlerInputForm(evt){
  const submit = evt.currentTarget.querySelector('.button');
  const [...inputs] = evt.currentTarget.elements; 
  
  isFieldValid(evt.target); 
  
  if (inputs.every(isValidate)) { 
    setSubmitButtonState(submit, true);
  } else {
    setSubmitButtonState(submit, false);
    
  }

}

form.addEventListener('submit', sendForm);
form.addEventListener('input', handlerInputForm, true);

formEdit.addEventListener('submit', sendForm);
formEdit.addEventListener('blur', handlerInputForm, true);
