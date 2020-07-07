class PopupPhoto extends Popup {
  constructor(popup) {
    super(popup)


}

open(evt) {

  this.container = document.querySelector('.popup__image');

  if (evt.target.classList.contains('place-card__image')) {
    const image = evt.target.getAttribute('data-image')
    this.container.setAttribute('src', image);
    super.open()

  }

}
}
