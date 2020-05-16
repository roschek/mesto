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
const collector = document.querySelectorAll('.error')
const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
}




// функция проверки
function isValidate(input) {

  input.setCustomValidity(""); // устанавливаем свойсво validity.customError в false

  if (input.validity.valueMissing) {
    input.setCustomValidity(errorMessages.empty);
    return false
  }

  if (input.validity.tooShort || input.validity.tooLong) {
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

function handlerInputForm(inputs, submit) {
  /*const submit = evt.currentTarget.querySelector('.button');
  // Можно лучше
  // spread оператор не нужен
  const [...inputs] = evt.currentTarget.querySelectorAll('input')*/
  /*isFieldValid(evt.target);*/
  inputs.forEach(isFieldValid);

  if (inputs.every(isValidate)) {

    setSubmitButtonState(submit, true);
  } else {
    setSubmitButtonState(submit, false);

  }
}

// Этот метод должен вызваться один раз для каждой формы, которую вы хотите валидировать
// Он не прикрепляется к событию
function checkForm(form) {
  // Кнопку получили, отлично
  // Только currentTarget уберите, он и тут и у массива ни к чему совсем
  const submit = form.querySelector('.button');
  // Массив получили, но не пойму почему не простое присвоение а через [...]
  const [...inputs] = form.querySelectorAll('input')
 console.log(inputs,submit);
  form.addEventListener('input',()=>handlerInputForm(inputs,submit))
  // Теперь на полученную форму установите слушатель события input
  // Обработчиком будет являться
  // () => handlerInputForm(inputs, submit)
  
  // Таким образом форма будет слушать событие ввода, как только оно произойдет,
  // обработчик пробежит по инпутам, проверит форму и кнопку приведет в соответствие.
  // Этим методом вы легко прикрутите валидацию ко второй форме, его просто вызвать достаточно передав туда
  // объект формы для карты.
}

// ++Можно лучше
//++ Чистите ошибки а не спаны все же, имя лучше другое
function cleanError() {
  collector.forEach(function (element) {
    element.textContent = '';
  })
}

function togglePopup() {
  popup.classList.toggle('popup_is-opened');
  submitForm.setAttribute('disabled', true);
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

function cardValue() {
  const name = document.querySelector('.user-info__name').innerHTML;
  const profession = document.querySelector('.user-info__job').innerHTML;
  const { pers, description } = formEdit.elements
  pers.value = name;
  description.value = profession;
  submitFormEdit.removeAttribute('disabled');
  submitFormEdit.classList.add(`popup__button_valid`);
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
  // Можно лучше
  // (elem) => {...}
  initialCards.forEach(function (elem) {
    const photoArray = createNewPhoto(elem.name, elem.link);
    placesList.appendChild(photoArray);
  })
}

// добавление карточек попапом

function addNewPhoto(event) {
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

placesList.addEventListener('click', function (event) {
  const currentCard = event.target;
  const popupImage = document.querySelector('.popup__image');
  if (currentCard.classList.contains('place-card__image')) {
    const image = currentCard.getAttribute('data-image')
    popupImage.setAttribute('src', image);

    togglePopupPhoto();
  }
});

// Надо исправить
// Заведите метод, который на вход получает форму.
// Метод внутри себя ставит на нее обработчик input.
// Обработчик выбирает из формы массив инпутов и кнопку, вызывает handlerInputForm и передает ему массив и кнопку.
// Теперь при каждом нажатии клавиши не надо выбирать все инпуты из формы заново.
// Вызовете этот метод для двух форм = профит!

// спасибо, вроде начал немного понимать, хотя не уверен что правильно...

// Пока неправильно. Этот метод не должен быть обработчиком. Он вызывается один раз с переданным в него параметром
// Если надо другую форму валидировать, то вызовете его еще раз с другим параметром.

//form.addEventListener('input', checkForm, true);
//formEdit.addEventListener('click', checkForm, true);

buttonEdit.addEventListener('click', togglePopupEdit);
buttonEdit.addEventListener('click', cardValue);
button.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup);
popupCloseEdit.addEventListener('click', togglePopupEdit);
popupClosePhoto.addEventListener('click', togglePopupPhoto);

form.addEventListener('submit', addNewPhoto);
formEdit.addEventListener('submit', changePerson);
addPhoto();
checkForm(form);
checkForm(formEdit);

//ствуйте

// Надо исправить
// Валидация не работает сейчас. См. комментарии в коде.

// Исправьте, и присылайте.