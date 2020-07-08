
import {Api} from './script/Api.js';
import {Card} from './script/Card.js';
import {CardList} from './script/CardList.js';
import {FormValid} from './script/FormValidator.js';
import {Popup} from './script/Popup.js';
import {PopupPhoto} from './script/PopupPhoto.js';
import {UserInfo} from './script/UserInfo.js';
import "./style.css";


const placesList = document.querySelector('.places-list');
const userPhoto = document.querySelector('.user-info__photo');
const openPopup = document.querySelector('.button');
const openPopupEdit = document.querySelector('.button__edit');
const popupClose = document.querySelector('.popup__close');
const popupCloseEdit = document.querySelector('.popup__close-edit');
const popupClosePhoto = document.querySelector('.popup__close-photo');
const openPopupAva = document.querySelector('.user-info__photo')
const closePopupAva = document.querySelector('.popup__close-ava')
const submitForm = document.querySelector('.popup__button');
const submitFormEdit = document.querySelector('.button__popup-edit');
const submitFormAva = document.querySelector('.button__popup-ava')

const popupCard = document.querySelector('.popup__card')
const popupEditForm = document.querySelector('.popup__edit')
const popupPhotoPop = document.querySelector('.popup__photo')
const popupAvatar = document.querySelector('.popup__avatar');

const popup = new Popup(popupCard)
const popupEdit = new Popup(popupEditForm)
const popupAva = new Popup(popupAvatar)
const popPhoto = new PopupPhoto(popupPhotoPop)


const cardList = new CardList(document.querySelector('.places-list'))

const form = document.forms.new;
const formEdit = document.forms.person;
const formAva = document.forms.avatar;
const { name, link } = form.elements;
const {pers, description} = formEdit.elements;

const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
}


const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort11',
  headers: {
    authorization: 'b8380451-2782-4063-bf78-8aa1a677993c',
    'Content-Type': 'application/json'
  }
})

const cardHtml = function (name, link, id, countLike) {
  const cardHTML = new Card(name, link, id, countLike).createNewPhoto();
  return cardHTML
}
//получаем информацию о пользователе

api.getUserInfo()
  .then((data) => {
    const infoCards = JSON.stringify(data);
    const infoAuthor = JSON.parse(infoCards);
    const userInfo = document.querySelector('.user-info__name')
    const userJob = document.querySelector('.user-info__job')
    const userPhoto = document.querySelector('.user-info__photo')
    userInfo.textContent = infoAuthor.name;
    userJob.textContent = infoAuthor.about;
    userPhoto.style = `background-image: url(${infoAuthor.avatar})`;
  })
  .catch(err => { console.log(`Упc, что-то пошло не так, например это ${err}`) })

//рендерим карточки
api.getInitialCards()
  .then((data) => {
    const photos = JSON.stringify(data);
    const photoArr = JSON.parse(photos);
    return photoArr
  })
  .then(photoArr => {
    const cardElements = photoArr.map(elem => {
      const card = cardHtml(elem.name, elem.link, elem._id, elem.likes)
      return card
    })

    return cardElements
  })
  .then((cardHTML) => {
    cardList.render(cardHTML)
  })
  .catch(err => { console.log(`Упc, что-то пошло не так, например это ${err}`) })

// добавляем фоточки

function changePerson(event) {
  event.preventDefault();

  api.updateInfo(pers.value, description.value)
    .then((data) => {

      const userName = document.querySelector('.user-info__name');
      const userDescription = document.querySelector('.user-info__job');
      userName.textContent = data.name;
      userDescription.textContent = data.about;

      popupEdit.close();

    })

    .catch(err => {

      console.log(`Упc, что-то пошло не так, например это ${err}`)
    })

}

function addPhoto(evt) {

  evt.preventDefault();
  api.addCardToServer(name.value, link.value)
    .then(submitForm.textContent = 'Загрузка...') 
    .then(api.getInitialCards())
    .then(popup.close)
    .then(submitForm.textContent = '+')
    .then(form.reset())
    .catch(err => { console.log(`Упc, что-то пошло не так, например это ${err}`) })

}

function changeAvatar(evt) {

  evt.preventDefault();
  api.updateUser(ava.value)
    .then(submitFormAva.textContent = 'Загрузка...')
    .then(userPhoto.style = `background-image: url(${ava.value})`)
    .then(popupAva.close)
    .then(submitFormAva.textContent = 'Сохранить')
    .then(formAva.reset())
    .catch(err => { console.log(`Упc, что-то пошло не так, например это ${err}`) })

}

// данные в попап
function cardValue() {

  const name = document.querySelector('.user-info__name').innerHTML;
  const profession = document.querySelector('.user-info__job').innerHTML;
  const { pers, description } = formEdit.elements
  pers.value = name;
  description.value = profession;

}

//валидация
const formVal = new FormValid(form, errorMessages);
const formEditVal = new FormValid(formEdit, errorMessages);
const formAvaVal = new FormValid(formAva, errorMessages);
formVal.setEventListeners()
formEditVal.setEventListeners()
formAvaVal.setEventListeners()

//Меняем название карточки
const newCard = new UserInfo(formEdit, popupEdit);
//слушатели

openPopup.addEventListener('click', () => {
  form.reset();
  formVal.setSubmitButtonState(false);
  formVal.resetError();
  popup.open()
})

openPopupEdit.addEventListener('click', () => {
  cardValue();
  formEditVal.setSubmitButtonState(true);
  formEditVal.resetError();
  popupEdit.open()
})

openPopupAva.addEventListener('click', () => {
  formAvaVal.setSubmitButtonState(false);
  formAvaVal.resetError();
  popupAva.open()

})

popupClose.addEventListener('click', popup.close)
popupCloseEdit.addEventListener('click', popupEdit.close)
closePopupAva.addEventListener('click', popupAva.close)
formEdit.addEventListener('submit', changePerson);
form.addEventListener('submit', addPhoto);
formAva.addEventListener('submit', changeAvatar)
placesList.addEventListener('click', popPhoto.open)
popupClosePhoto.addEventListener('click', popPhoto.close)
openPopupEdit.addEventListener('click', cardValue)
