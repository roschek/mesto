
class CardList {
  constructor(container) {
    this.container = container
    this.cardsArr = []
  }

  addCard(event){
    event.preventDefault();
    const { name, link } = form.elements;
    const cardContainer = new Card(name.value, link.value);
    placesList.appendChild(cardContainer.createNewPhoto());
    cardContainer.setEventListeners();
        
  };


  render(cardsArray) {
    const placesList = document.querySelector('.places-list');
    cardsArray.forEach(function (elem) {
      const card = new Card(elem.name, elem.link);
      placesList.appendChild(card.createNewPhoto());
      card.setEventListeners();
    })

  }
  
}

const form = document.forms.new;
const cardlist = new CardList(document.querySelector('.places-list'))

cardlist.render(initialCards);

form.addEventListener('submit', cardlist.addCard);