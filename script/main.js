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

function addPhoto(evt) {
  
  evt.preventDefault();
  /*++REVIEW3. Надо исправить. Если выполняется обращение к серверу, появляется ошибка. Если закоментировать обращение к серверу,
  добавляется пустая карточка без картинки. Разберитесь почему и исправьте (что надо было сделать до отсылки работы на ревью).
  Рекомендую Вам пока не заниматься дополнительными заданиями и сделать правильно добавление карточки, как было в прошлых заданиях,
  без обращения к серверу.
 */
 
  api.addCardToServer(name.value, link.value)
    .then(api.getInitialCards())
    .then(popup.close)
    .then(form.reset())
    .catch(err => { console.log(`Упc, что-то пошло не так, например это ${err}`) })
  //REVIEW3
  /*++REVIEW. Надо исправить. Нижеследующая строчка кода повторяет такую же строчку в методе map создания массива cardHTML,
  поэтому её надо занести в функцию и вызывать эту функцию с нужными параметрами в обоих случаях..*/

}
//функция сломалась, т.к. это доп. задание потом допилю
function changeAvatar(evt) {

  evt.preventDefault();
  api.updateUser(ava.value)
  .then(userPhoto.style = `background-image: url(${ava.value})`)
  .then(popupAva.close)
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

/*++REVIEW3. Надо исправить. Вы рассматриваете событие 'submit' формы профиля, в слушателе которого и
должна быть выдана инструкция закрыти формы профиля. При работе с сервером закрывать форму при событии
'click' по кнопке сабмита нельзя, так как форма должна закрыться только после получения положительного
ответа от сервера и никак не раньше. Вообще-то при третьей проверке, я повторяю это третий раз.
   */
//REVIEW3
popupClose.addEventListener('click', popup.close)
popupCloseEdit.addEventListener('click', popupEdit.close)
closePopupAva.addEventListener('click',popupAva.close)

formEdit.addEventListener('submit', newCard.changePerson);
form.addEventListener('submit', addPhoto);
formAva.addEventListener('submit', changeAvatar)
placesList.addEventListener('click', popPhoto.open)
popupClosePhoto.addEventListener('click', popPhoto.close)
openPopupEdit.addEventListener('click', cardValue)


/*REVIEW. Резюме.

При попытке добавления новой карточки возникает ошибка в консоли.ReferenceError: renderLoading is not defined
main.js:103:3

Что надо исправить прежде всего (ошибок в проекте много, не исключена возможность открытия новых критических неточностей при повторной проверке).

1.++ Структура методов Api должна быть  изменена в части обработки неуспешного ответа сервера (подробный комментарий в классе Api).

2.++ Никак не обрабатывается ответ от сервера в случае запроса методом 'PATCH'. Нужно сделать его обработку (подробный комментарий в классе UserInfo).

3.++ При рендере карточек при загрузке страницы должен использоваться метод render класса CardList таким же образом, как Вы его использовали в 8-м
задании.

4.++/ Проверил, ошибки нет вроде бы Нужно исправить ошибку, появляющуюся в консоли.

5.Сообщаю, что ещё на очереди корректировка валидации форм по предыдущим заданиям, а также ошибки в вёрстке - крестик у всплывающих окон большого фото
появляется не над верхним правым углом фото, а когда где.++

____________________________________________________________________________________________________________________________________________________________
REVIEW2. Резюме2.
Выполнены  пункты 1, 3, 4 и по вёрстке от первой проверки.

Что нужно исправить теперь.

1.++ Ещё раз смотрите расширенные комментарии в классе UserInfo для выполнения пункта 2 от первой проверки.

2.++ При входе в форму профиля и установки фокуса на каком-либо из полей под полем появляется сообщение об ошибке (см.
  снимок "20200609_182314.jpg" в корне Вашего проекта). Валидация формы профиля должна быть такой, как у Вас была в 7-м задании,
  по окончательным требованиям ревьюера.

3. ++ В  index.html нужно убрать ограничения на длину ссылки.

4. ++При сабмите форма карточки теперь не закрывается, при открытии после сабмита, она открывается с активной кнопкой сабмита, чего быть не должно.
Валидация формы карточки должна быть такой, как у Вас была в 7-м задании, по окончательным требованиям ревьюера.

5. ++ Нужно преобразовать класс Popup и сделать в нём только 2 метода - один из них добавляет в класслист окна модификатор его показа, другой удаляет
(подробный комментарий в классе Popup).

6.++ Нужно преобразовать класс PopupPhoto и использовать в нём методы класса Popup, чтобы избежать дублирование кода.
(подробные комментарии в классе PopupPhoto).

7.++ Нужно устранить дублирование кода в методе map создания массива cardHTML и обработчике сабмита формы карточки
(подробные комментарии в этом файле).


____________________________________________________________________________________________________________________________________________________________
REVIEW3. Резюме3.

Что сделано, то получилось.


Что нужно сделать ещё.

1.++ Из метода close класса Popup нужно убрать инструкцию form.reset() (подробный комментарий в классе Popup).

2.++ Не нужно вводить метод close() в классе PopupPhoto, нужно пользоваться родительским (подробный комментарий в классе PopupPhoto).

3.++ Нужно правильно и в нужном месте сделать закрытие формы профиля при сабмите, учитывая асинхронность ответа сервера.
Асинхронность означает, что все команды проекта, находящиеся вне метода then обработки ответа от сервера, выполнятся (которые могут выполниться
в это время по логике проекта) раньше, чем придёт ответ от сервера. И, если Вы хотите, чтобы какие-то команды не выполнялись до прихода ответа,
их нужно поместить в методы then, или catch обработки ответа (подробный комментарий в классе UserInfo).

4.++ При работе с сервером закрывать форму при событии 'click' по кнопке сабмита нельзя, так как форма должна закрыться только после получения
 положительного ответа от сервера и никак не раньше (подробный комментарий в этом файле).

5.++ При сабмите формы карточки добавляется пустая карточка без картинки. Разберитесь почему и исправьте (подробный комментарий в этом файле).

6. ++Форма карточки, если в неё повторно войти после сабмита, открывается с активной кнопкой сабмита. Нужно в слушателе открытия формы карточки
делать кнопку сабмита неактивной.

Напоминаю, что следующая проверка будет четвёртой, а по правилам возможно только четыре проверки, поэтому исправьте все ошибки и протестируйте проект,
чтобы убедиться, что они действительно исправлены.

*/


