class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;

  }

  createNewPhoto() {

    const cardContainer = document.createElement('div');
    const cardImageElement = document.createElement('div');
    const deleteIconElement = document.createElement('button');
    const cardDescription = document.createElement('div');
    const cardNameElement = document.createElement('h3');
    const likeIconElement = document.createElement('button');

    cardContainer.classList.add('place-card');
    cardImageElement.classList.add('place-card__image');
    cardImageElement.style = `background-image: url(${this.link})`;
    cardImageElement.setAttribute('data-image', `${this.link}`)
    deleteIconElement.classList.add('place-card__delete-icon');
    cardDescription.classList.add('place-card__description');
    cardNameElement.classList.add('place-card__name');
    cardNameElement.textContent = `${this.name}`;
    likeIconElement.classList.add('place-card__like-icon');

    cardContainer.appendChild(cardImageElement);
    cardImageElement.appendChild(deleteIconElement);
    cardContainer.appendChild(cardDescription);
    cardDescription.appendChild(cardNameElement);
    cardDescription.appendChild(likeIconElement);

    this.photoCard = cardContainer;

    return cardContainer;
  };
  setEventListeners() {
    this
      .photoCard
      .querySelector('.place-card__like-icon')
      .addEventListener('click', this.like)


    this
      .photoCard
      .querySelector('.place-card__delete-icon')
      .addEventListener('click', this.delete)
  
    
  }

  like(event) {
    const currentCard = event.target;
    if (currentCard.classList.contains('place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }
  }


  delete(event) {
    const currentCard = event.target;
    if (currentCard.classList.contains('place-card__delete-icon')) {
      currentCard.closest('.place-card').remove();
    };
  }

}