export class Card {
  constructor(name, link, id, count) {
    this.name = name;
    this.link = link;
    this.id = id;
    this.count = count
  }

  createNewPhoto() {

    const cardContainer = document.createElement('div');
    const cardImageElement = document.createElement('div');
    const deleteIconElement = document.createElement('button');
    const cardDescription = document.createElement('div');
    const cardNameElement = document.createElement('h3');
    const likeDiv = document.createElement('div');
    const likeIconElement = document.createElement('button');
    const likeCounter = document.createElement('span')

    cardContainer.classList.add('place-card');
    cardContainer.id = this.id;
    cardImageElement.classList.add('place-card__image');
    cardImageElement.style = `background-image: url(${this.link})`;
    cardImageElement.setAttribute('data-image', `${this.link}`)
    deleteIconElement.classList.add('place-card__delete-icon');
    cardDescription.classList.add('place-card__description');
    cardNameElement.classList.add('place-card__name');
    cardNameElement.textContent = `${this.name}`;
    likeDiv.classList.add('place-card__like-div');
    likeIconElement.classList.add('place-card__like-icon');
    likeCounter.classList.add('.place-card__like-counter');
    likeCounter.textContent = `${this.count.length}`;

    cardContainer.appendChild(cardImageElement);
    cardImageElement.appendChild(deleteIconElement);
    cardContainer.appendChild(cardDescription);
    cardDescription.appendChild(cardNameElement);
    cardDescription.appendChild(likeDiv);
    likeDiv.appendChild(likeIconElement);
    likeDiv.appendChild(likeCounter)


    this.photoCard = cardContainer;

    this.setEventListeners();

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

  like(evt) {

    evt.target.classList.toggle('place-card__like-icon_liked');
    api.cardLike(event.target.closest('.place-card').id)

  }


  delete(event) {
    const cardId = event.target.closest('.place-card').id
    if (window.confirm('НЕЕТ! ТЫ уверен что хочешь это сделать?')) {
      api.deleteCard(cardId)
      event.target.closest('.place-card').remove();
    }
  };
}

