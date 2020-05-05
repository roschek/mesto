
const button = document.querySelector('.button');
const placesList = document.querySelector('.places-list');
// Переменная не используется
const likeIcon = document.querySelector('.place-card__like-icon');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const form = document.forms.new;

//++ Можно лучше
// Вызов методов перенести в конец скрипта



// функция для открытия-закрытия popup
// Отлично, один метод для открытия-закрытия
function togglePopup() {
  popup.classList.toggle('popup_is-opened');
};




// В смысле не работает? Карту новую добавляет - это старый коментарий был, исправил но забыл удалить

function createNewPhoto(nameValue, linkValue) {

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('place-card');

  const cardImageElement = document.createElement('div');
  cardImageElement.classList.add('place-card__image');
  cardImageElement.style.backgroundImage = `url(${linkValue})`;


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


function addPhoto() {
  // ++Надо исправить
  // Вызывайте здесь createNewPhoto,
  // только не забудьте его определение поднять выше этого метода

  for (let i = 0; i < initialCards.length; i++) {
        
     let photoArray =  createNewPhoto(initialCards[i].name, initialCards[i].link);
    
    placesList.appendChild(photoArray);
  }
};

function addNewPhoto(event) {
  event.preventDefault();
  //++ Можно лучше -- деструктуризация
   const {name,link} = form.elements;
 
  const cardContainer = createNewPhoto(name.value, link.value);

  placesList.appendChild(cardContainer);
  form.reset();
  togglePopup();

};

// кнопка лайков

// Можно лучше
// Код слушателей вынести в отдельные методы а тут их уже к событиям прикрепить

placesList.addEventListener('click', function (event) {
  if (event.target.classList.contains('place-card__like-icon'))
    event.target.classList.toggle('place-card__like-icon_liked');
  // Поясните пожалуйста зачем тут этот код? Когда ставим лайк мы тогглим стил у кнопки лайка и все,
  // Зачем слушатель удалять? Удаляете, кстати, неправильно.
  // Вы используете делегирование, слушатели удалять не надо
  // Но как правильно ставить слушатели чтобы они потом удалились и как их корректно удалять
  // читайте тут https://learn.javascript.ru/introduction-browser-events#addeventlistener
 // если честно, сам не помню зачем его тут удалял
});

//  удаление элемента

placesList.addEventListener('click', function (event) {
  //+++ Надо исправть -- этот поезд из parentNode далеко не уедет
  // используйте https://developer.mozilla.org/ru/docs/Web/API/Element/closest
  //let eventTarget = event.target.parentNode;
  //let el = eventTarget.parentNode;
  let currentCard = event.target;
   
  if (currentCard.classList.contains('place-card__delete-icon'))
    {
     currentCard.closest('.place-card').remove();
   };
})

button.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup);
form.addEventListener('submit', addNewPhoto);
addPhoto();

// Здравствуйте
// Не совсем понятны некоторые ваши комментарии, надеюсь ко второму ревью появится ясность
// Сделано неплохо все, но таки надо формировать карту одним методом, он у вас есть и им и работайте
// Прочие каооментарии в коде
// Исправьте критические замечания и присылайте на проверку.

