
export class CardList {
  constructor(container) {
    this.container = container;
  }

  addCard(elem) {

    this.container.appendChild(elem);

  }

  render(cards) {

    cards.forEach(element => {
      this.addCard(element);

    });
  }


}