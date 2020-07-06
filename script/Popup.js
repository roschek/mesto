class Popup {
  constructor(popup) {
    this.popup = popup
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.submit = this.popup.querySelector('.button')
  }

  open() {

    this.popup.classList.add('popup_is-opened');

  }

  close() {
    this.popup.classList.remove('popup_is-opened');

  }

}








