import Card from "./Card.js";

export default class CardStack {
  #cards;

  constructor() {
    this.#cards = [];
  }

  shuffle() {
    const cards = this.#cards;
    let currentIndex = cards.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [cards[currentIndex], cards[randomIndex]] = [
        cards[randomIndex],
        cards[currentIndex],
      ];
    }

    this.#cards = cards;
  }

  getNextCard() {
    if (this.#cards.length === 0) {
      return undefined;
    }

    const nextCard = this.#cards[0];

    this.#cards = this.#cards.filter((card) => !card.equals(nextCard));

    return nextCard;
  }

  getCards() {
    return this.#cards;
  }

  importJson(json) {
    this.#cards = json.map(
      (card, index) =>
        new Card(index + 1, card.prompt, card.consequence, card.emojis)
    );

    return this.#cards;
  }
}
