const button = document.querySelector('.button');
const buttonEdit = document.querySelector('.button__edit');
const placesList = document.querySelector('.places-list');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup__edit');
const popupPhoto = document.querySelector('.popup__photo');
const popupClose = document.querySelector('.popup__close');
const popupCloseEdit = document.querySelector('.popup__close-edit');
const popupClosePhoto = document.querySelector('.popup__close-photo');
const submitForm = document.querySelector('.popup__button');
const submitFormEdit = document.querySelector('.button__popup-edit');
const form = document.forms.new;
const formEdit = document.forms.person;
const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
}

function handlerInputForm(evt) {
  const submit = evt.currentTarget.querySelector('.button');
 
  // Надо исправить
  // Здесь тоже не только инпуты, но и кнопка
  // Не так поняли
  
    //+++ В этом массиве инпуты и кнопка
    // Сюда надо только инпуты добавить из формы
    const [...inputs] = evt.currentTarget.querySelectorAll('input')
     
    isFieldValid(evt.target);
    

    if (inputs.every(isValidate)) {
      setSubmitButtonState(submit, true);
    } else {
      setSubmitButtonState(submit, false);

    }
  }


// функция проверки
function isValidate(input) {

  input.setCustomValidity(""); // устанавливаем свойсво validity.customError в false

  if (input.validity.valueMissing) {
    input.setCustomValidity(errorMessages.empty);
    return false
  }

  if (input.validity.tooShort || input.validity.tooLong) {
    //++ Вы же объект с ошибками завели, так им пользуйтесь!
    input.setCustomValidity(errorMessages.wrongLength);

    return false
  }
  if (input.validity.typeMismatch) {

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
  console.log(errorForm);
  return valid;
}


// вкл и выкл кнопки
function setSubmitButtonState(button, state) {
  if (state) {
    button.removeAttribute('disabled');

  } else {
    button.setAttribute('disabled', true);

  }
}

function togglePopup() {
  popup.classList.toggle('popup_is-opened');
  submitForm.setAttribute('disabled', true);
  form.reset();
  cleanSpan();
};

function togglePopupEdit() {
  popupEdit.classList.toggle('popup_is-opened');
  submitFormEdit.setAttribute('disabled', true);
  cleanSpan()
  formEdit.reset();
}

function togglePopupPhoto() {
  popupPhoto.classList.toggle('popup_is-opened');
}
//очищаем поля спанам
function cleanSpan() {
  const collector = document.querySelectorAll('span')
  collector.forEach( function(element){
    element.textContent = '';
  })
}

// изменение названия карточки

function changePerson(event) {
  event.preventDefault();
  const userName = document.querySelector('.user-info__name');
  const userDescription = document.querySelector('.user-info__job');
  const { pers, description } = formEdit.elements
  userName.textContent = pers.value;
  userDescription.textContent = description.value;
  formEdit.reset();
  togglePopupEdit();
  
}


// создание карточки с фоткой

function createNewPhoto(nameValue, linkValue) {
  // Можно лучше
  // Воспользуйтесь <template> -- https://developer.mozilla.org/ru/docs/Web/HTML/Element/template
  // И cloneNode -- https://developer.mozilla.org/ru/docs/Web/API/Node/cloneNode
  // Для удобного тиражирования одинаковых объектов
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('place-card');

  const cardImageElement = document.createElement('div');
  cardImageElement.classList.add('place-card__image');
  cardImageElement.style.backgroundImage = `url(${linkValue})`;
  cardImageElement.setAttribute('data-image', `${linkValue}`)


  const deleteIconElement = document.createElement('button');
  deleteIconElement.classList.add('place-card__delete-icon');

  const cardDescription = document.createElement('div');
  cardDescription.classList.add('place-card__description');

  const cardNameElement = document.createElement('h3');
  cardNameElement.classList.add('place-card__name');
  cardNameElement.textContent = nameValue;

  const likeIconElement = document.createElement('button');
  likeIconElement.classList.add('place-card__like-icon');

  cardContainer.appendChild(cardImageElement);
  cardImageElement.appendChild(deleteIconElement);
  cardContainer.appendChild(cardDescription);
  cardDescription.appendChild(cardNameElement);
  cardDescription.appendChild(likeIconElement);


  return cardContainer;
};

//  добавление карточек при загрузке

function addPhoto() {

  initialCards.forEach(function (elem) {
    const photoArray = createNewPhoto(elem.name, elem.link);

    placesList.appendChild(photoArray);
  })
}

// добавление карточек попапом

function addNewPhoto(event) {
  // event не передан
  // надо исправить
  event.preventDefault();
  const { name, link } = form.elements;
  const cardContainer = createNewPhoto(name.value, link.value);
  placesList.appendChild(cardContainer);
  form.reset();
  togglePopup();
};

// кнопка лайков
placesList.addEventListener('click', function (event) {
  if (event.target.classList.contains('place-card__like-icon'))
    event.target.classList.toggle('place-card__like-icon_liked');

});

//  удаление элемента

placesList.addEventListener('click', function (event) {

  const currentCard = event.target;


  if (currentCard.classList.contains('place-card__delete-icon')) {
    currentCard.closest('.place-card').remove();
  };
})

// открываем фотку

// eslint-disable-next-line prefer-arrow-callback
placesList.addEventListener('click', function (event) {

  const currentCard = event.target;
  const popupImage = document.querySelector('.popup__image');
  if (currentCard.classList.contains('place-card__image')) {

    const image = currentCard.getAttribute('data-image')
     popupImage.setAttribute('src', image);

    togglePopupPhoto();
  }
});

form.addEventListener('input', handlerInputForm, true);
formEdit.addEventListener('input', handlerInputForm, true);
buttonEdit.addEventListener('click', togglePopupEdit);
button.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup,);
popupCloseEdit.addEventListener('click', togglePopupEdit,);
popupClosePhoto.addEventListener('click', togglePopupPhoto, );

form.addEventListener('submit', addNewPhoto);
formEdit.addEventListener('submit', changePerson);
addPhoto();


