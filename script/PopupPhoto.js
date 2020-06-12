class PopupPhoto extends Popup {
  constructor(popup) {
    super(popup)


}

/*++REVIEW3. Надо исправить. Ни к чему переопределять метод close родительского класса. Для закрытия окна большого фото следует пользоваться
методом родительского класса, когда Вы его правильно подкорректируете (см. комментарий в классе Popup), и добавлять на крестик закрытия
окна  большого фото в main.js, что у Вас, впрочем, уже и сделано. */


open(evt) {

  this.container = document.querySelector('.popup__image');

  if (evt.target.classList.contains('place-card__image')) {
    const image = evt.target.getAttribute('data-image')
    this.container.setAttribute('src', image);
    super.open()

  }

}
}