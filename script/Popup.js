class Popup{
  constructor(container, bttn, bttnClose){
  this.container = container;
  this.bttn =bttn;
  this.bttnClose= bttnClose;
  
  }
 

  open(evt){
    evt.bttn.addEventListener('click', function(){
    evt.container.classList.add('popup_is-opened')
     
  })}

  close(evt){
    
    evt.bttnClose.addEventListener('click',function(){
    evt.container.closest('.popup').classList.remove('popup_is-opened');})
    
  }
}
const openPopup = document.querySelector('.button');
const openPopupEdit = document.querySelector('.button__edit');
const popupClose = document.querySelector('.popup__close');
const popupCloseEdit = document.querySelector('.popup__close-edit');

const popup = new Popup(document.querySelector('.popup'),openPopup,popupClose)
const popupEdit = new Popup(document.querySelector('.popup__edit'),openPopupEdit,popupCloseEdit)
/*const popupPhoto = new Popup(document.querySelector('.popup__photo'))*/

popup.open(popup)
popup.open(popupEdit)
popup.close(popup)
popup.close(popupEdit)



/*
buttonEdit.addEventListener('click', cardValue);
*/