class Popup {
  
  constructor(container, bttn, bttnClose, submit) {
    this.container = container;
    this.bttn = bttn;
    this.bttnClose = bttnClose;
    this.submit = submit;
    
  }


  open(evt) {
   
    evt.bttn.addEventListener('click', function () {
      evt.container.classList.add('popup_is-opened')

    })
  }

  close(evt) {
   
    evt.bttnClose.addEventListener('click', function () {
      
      evt.container.closest('.popup').classList.remove('popup_is-opened');
     
    })
    evt.submit.addEventListener('click', function () {
         
      evt.container.closest('.popup').classList.remove('popup_is-opened');
      
    })
    
  }

  delPhoto(){
    const popupPhoto = document.querySelector('.popup__photo');
    this.bttnClose = document.querySelector('.popup__close-photo');
    this.bttnClose.addEventListener('click',function(){
     popupPhoto.classList.toggle('popup_is-opened');
    })
  }

  openPhoto(evt) {

    
    this.container = document.querySelector('.popup__image');
    const popupPhoto = document.querySelector('.popup__photo');
    
    if (evt.target.classList.contains('place-card__image')) {
      const image = evt.target.getAttribute('data-image')
      this.container.setAttribute('src', image);
      popupPhoto.classList.toggle('popup_is-opened');
     
    }
   
  }
}
  






