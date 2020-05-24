
/*const button = document.querySelector('.button');
const buttonEdit = document.querySelector('.button__edit');
const placesList = document.querySelector('.places-list');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup__edit');
const popupPhoto = document.querySelector('.popup__photo');
const popupClose = document.querySelector('.popup__close');
const popupCloseEdit = document.querySelector('.popup__close-edit');*/
/*const popupClosePhoto = document.querySelector('.popup__close-photo');*/
const submitForm = document.querySelector('.popup__button');
const submitFormEdit = document.querySelector('.button__popup-edit');

const formEdit = document.forms.person;
const collector = document.querySelectorAll('.error')
const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
}


/*

// функция проверки
function isValidate(input) {

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
*/
/*
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
}*/
/*
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
}*/
/*
function togglePopup() {
  popup.classList.toggle('popup_is-opened');
  submitForm.setAttribute('disabled', true);
  submitForm.classList.remove('popup__button_valid')
  form.reset();
  cleanError();
};

function togglePopupEdit() {
  popupEdit.classList.toggle('popup_is-opened');
  submitFormEdit.setAttribute('disabled', true);
  cleanError()
  formEdit.reset();
}

function togglePopupPhoto() {
  popupPhoto.classList.toggle('popup_is-opened');
  submitFormEdit.setAttribute('disabled', true);
  cleanError()
  formEdit.reset();
}
*/

/*
// изменение названия карточки
function changePerson(event) {
  event.preventDefault();
  const userName = document.querySelector('.user-info__name');
  const userDescription = document.querySelector('.user-info__job');
  const { pers, description } = formEdit.elements
  userName.textContent = pers.value;
  userDescription.textContent = description.value;
  formEdit.reset();
  /*togglePopupEdit();

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


// открываем фотку
/*
placesList.addEventListener('click', function (event) {
  const currentCard = event.target;
  const popupImage = document.querySelector('.popup__image');
  if (currentCard.classList.contains('place-card__image')) {
    const image = currentCard.getAttribute('data-image')
    popupImage.setAttribute('src', image);

    togglePopupPhoto();
  }
});
*/

/*buttonEdit.addEventListener('click', togglePopupEdit);*/
/*buttonEdit.addEventListener('click', cardValue);
/*button.addEventListener('click', togglePopup);*/
/*popupClose.addEventListener('click', togglePopup);
popupCloseEdit.addEventListener('click', togglePopupEdit);
popupClosePhoto.addEventListener('click', togglePopupPhoto);*/




/*checkForm(form);
checkForm(formEdit);*/

