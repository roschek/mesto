class FormValid {
  constructor(form, errors) {
    this.form = form;
    this.errors = errors;

    this.isValidate = this.isValidate.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.formInputs = Array.from(this.form.querySelectorAll("input"));
  }

  isValidate (inputElement) {
    if (inputElement.validity.valueMissing) {
      inputElement.nextElementSibling.textContent = validationErrors.Empty;
      return false;
    }
    if (
      (inputElement.validity.tooShort || inputElement.validity.tooLong) &&
      inputElement.type === "text"
    ) {
      inputElement.nextElementSibling.textContent = validationErrors.LongShort;
      return false;
    }
    if (!inputElement.validity.valid && inputElement.type === "url") {
      inputElement.nextElementSibling.textContent = validationErrors.NoLink;
      return false;
    }
    inputElement.nextElementSibling.textContent = "";
    return true;
  }


  // чтобы делать кнопку сабмита активной и неактивной.
  setSubmitButtonState() {
    let isValid = true;

    this.formInputs.forEach((elem) => {
      if (!this.checkInputValidity(elem)) {
        isValid = false;
      }
    });

    if (isValid === true) {
      this.form.submit.classList.remove("popup__button_disabled");
      this.form.submit.removeAttribute("disabled");
    } else {
      this.form.submit.classList.add("popup__button_disabled");
      this.form.submit.setAttribute("disabled", true);
    }
  }


  setEventListeners() {
    this.form.addEventListener("input", () => {
      this.setSubmitButtonState();
    });
  }

  isFieldValid(input) {
    const errorForm = this.input
    const errorElem = errorForm.querySelector(`#${input.id}-error`);
    const valid = isValidate(input); // устанавливаем инпуту кастомные ошибки, если они есть.
    errorElem.textContent = input.validationMessage;

    return valid;
  }

  handlerInputForm(submit) {
    this.isFieldValid;

    const currentForm = this.form;
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

  
}

/*

ПРОВЕРКА ВАЛИДНОСТИ


СБОРЩИК ВАЛИДНОСТИ


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



// функция проверки
/*function isValidate(input) {

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
*//*
function checkForm(form) {
  const submit = form.querySelector('.button');

  form.addEventListener('input', (evt) => handlerInputForm(evt, submit))
}*/

/*
function cleanError() {
  // Можно лучше
  // (element) => {...}
  collector.forEach(function (element) {
    element.textContent = '';
  })
}

// изменение названия карточки
/*function changePerson(event) {
  event.preventDefault();
  const userName = document.querySelector('.user-info__name');
  const userDescription = document.querySelector('.user-info__job');
  const { pers, description } = formEdit.elements
  userName.textContent = pers.value;
  userDescription.textContent = description.value;
  formEdit.reset();
  
}*/
/*
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

/*
checkForm(form);
checkForm(formEdit);
*/
