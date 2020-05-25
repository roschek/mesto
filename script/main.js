

const placesList = document.querySelector('.places-list');

const openPopup = document.querySelector('.button');
const openPopupEdit = document.querySelector('.button__edit');
const popupClose = document.querySelector('.popup__close');
const popupCloseEdit = document.querySelector('.popup__close-edit');
const popupClosePhoto = document.querySelector('.popup__close-photo');

const submitForm = document.querySelector('.popup__button');
const submitFormEdit = document.querySelector('.button__popup-edit');


const popup = new Popup(document.querySelector('.popup'),openPopup,popupClose,submitForm)
const popupEdit = new Popup(document.querySelector('.popup__edit'),openPopupEdit,popupCloseEdit,submitFormEdit)
const popPhoto = new Popup(document.querySelector('.popup__photo'),document.querySelector('.popup__image'),popupClosePhoto)
const cardlist = new CardList(document.querySelector('.places-list'))


const form = document.forms.new;
const formEdit = document.forms.person;
//const collector = document.querySelectorAll('.error')
const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
}

cardlist.render(initialCards);




// попапы
popup.open(popup)
popupEdit.open(popupEdit)
popup.close(popup)
popupEdit.close(popupEdit)




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


//Меняем название карточки

const newCard = new UserInfo(formEdit);


//слушатели 
formEdit.addEventListener('submit', newCard.changePerson);
form.addEventListener('submit', cardlist.addCard);
placesList.addEventListener('click',popPhoto.openPhoto)
popupClosePhoto.addEventListener('click',popPhoto.delPhoto())
openPopupEdit.addEventListener('click',cardValue)
submitForm.addEventListener('click',formVal.checkForm())
submitFormEdit.addEventListener('click',formEditVal.checkForm())

/*
Надо сделать:

валидация работает но текст ошибки не меняется
*/



