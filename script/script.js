const button = document.querySelector('.button');
const buttonEdit = document.querySelector('.button__edit');
const placesList = document.querySelector('.places-list');
const likeIcon = document.querySelector('.place-card__like-icon');
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
  const inputs = document.querySelectorAll('input');

  let valid = true;

  inputs.forEach((input) => {
     if (!isFieldValid(input)) valid = false;
    
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

function handlerInputForm(evt) {
  const submit = evt.currentTarget.querySelector('.button');
  const [...inputs] = evt.currentTarget.elements;

  isFieldValid(evt.target);

  if (inputs.every(isValidate)) {
    setSubmitButtonState(submit, true);
  } else {
    setSubmitButtonState(submit, false);

  }

}

function togglePopup() {
  popup.classList.toggle('popup_is-opened');
  submitForm.setAttribute('disabled', true);
  form.reset();
};
function togglePopupEdit() {
  popupEdit.classList.toggle('popup_is-opened');
  submitFormEdit.setAttribute('disabled', true);
  formEdit.reset();
}

function togglePopupPhoto() {
  popupPhoto.classList.toggle('popup_is-opened');
}

//изменение названия карточки

function ChangePerson(event) {
  event.preventDefault();
  const userName = document.querySelector('.user-info__name');
  const userDescription = document.querySelector('.user-info__job');
  const pers = formEdit.elements.pers;
  const description = formEdit.elements.description;
  userName.textContent = pers.value;
  userDescription.textContent = description.value;
  formEdit.reset();
  togglePopupEdit()
}

//создание карточки с фоткой

function createNewPhoto(nameValue, linkValue) {

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('place-card');

  const cardImageElement = document.createElement('div');
  cardImageElement.classList.add('place-card__image');
  cardImageElement.style.backgroundImage = `url(${linkValue})`;
  cardImageElement.setAttribute('data-image',`${linkValue}`)


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

  for (let i = 0; i < initialCards.length; i++) {

    let photoArray = createNewPhoto(initialCards[i].name, initialCards[i].link);

    placesList.appendChild(photoArray);
  }
};

//добавление карточек попапом

function addNewPhoto(event) {
  event.preventDefault();
  const { name, link } = form.elements;

  const cardContainer = createNewPhoto(name.value, link.value);

  placesList.appendChild(cardContainer);
  form.reset();
  togglePopup();
};

//кнопка лайков
placesList.addEventListener('click', function (event) {
  if (event.target.classList.contains('place-card__like-icon'))
    event.target.classList.toggle('place-card__like-icon_liked');

});

//  удаление элемента

placesList.addEventListener('click', function (event) {

  let currentCard = event.target;

  if (currentCard.classList.contains('place-card__delete-icon')) {
    currentCard.closest('.place-card').remove();
  };
})

// открываем фотку

placesList.addEventListener('click', function (event) {
  let currentCard = event.target;
  const popupImage = document.querySelector('.popup__image');
  if (currentCard.classList.contains('place-card__image') && !currentCard.classList.contains('place-card__delete-icon')) {
    const image = currentCard.getAttribute('data-image')
    console.log(image)
    popupImage.setAttribute('src', image);

    togglePopupPhoto();
  }
});

form.addEventListener('submit', sendForm);
form.addEventListener('input', handlerInputForm, true);

formEdit.addEventListener('submit', sendForm);
formEdit.addEventListener('blur', handlerInputForm, true);
buttonEdit.addEventListener('click', togglePopupEdit);
button.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup);
popupCloseEdit.addEventListener('click', togglePopupEdit);
popupClosePhoto.addEventListener('click', togglePopupPhoto);
form.addEventListener('submit', addNewPhoto);
formEdit.addEventListener('submit', ChangePerson);
addPhoto();

// Работа отклоняется от проверки
// ++Код (за исключением массива с данными) должен быть в одном файле, 
//модули вы еще не изучали./исправил но странно, в задании было сказано 'Если чувствуете, что скрипт разрастается — разбейте его на отдельные файлы и подключите их все в index.html.' /
// ++Зум реализован некорректно, пропорции исходного изображения искажаются.// исправил
//посмотрел+++/Вроде везде camelCase несколько раз п/ Не везде соблюден camelCase
// ---

// Советы (без учета которых сдача работы будет затруднительна):
//+++/исправил, вроде работает/ Для того чтобы искть URL не надо делать сложного парсинга. При создании карточки добавьте ей атрибут с адресом.
// А когда вам он понадобится -- прочитаете. Как это сделать: https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/data-*

//++  Чтобы получить все инпуты формы надо пользоваться не spread оператором, а querySelectorAll, например, и сразу выбрать
// все инпуты из формы. Тогда не придется проверять кнопка это или нет каждый раз./спасибо, исправил/

