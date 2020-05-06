
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
const form = document.forms.new;
const formEdit = document.forms.person;


function togglePopup() {
  popup.classList.toggle('popup_is-opened');
};
function togglePopupEdit() {
  popupEdit.classList.toggle('popup_is-opened');
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

  for (let i = 0; i < initialCards.length; i++) {

    let photoArray = createNewPhoto(initialCards[i].name, initialCards[i].link);

    placesList.appendChild(photoArray);
  }
};

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
    const image = currentCard.style.backgroundImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
    popupImage.setAttribute('src', `${image}`);

    togglePopupPhoto();

  }

});

buttonEdit.addEventListener('click', togglePopupEdit);
button.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup);
popupCloseEdit.addEventListener('click', togglePopupEdit);
popupClosePhoto.addEventListener('click', togglePopupPhoto);
form.addEventListener('submit', addNewPhoto);
formEdit.addEventListener('submit', ChangePerson);
addPhoto();

