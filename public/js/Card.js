export default class Card {
  #id;
  #prompt;
  #consequence;
  #emojis;

  constructor(id, prompt, consequence, emojis) {
    this.#id = id;
    this.#prompt = prompt;
    this.#consequence = consequence;
    this.#emojis = emojis;
  }

  getHtml() {
    return `<div class="card">
        <h3>#${this.#id}</h3>
        <hr>
        <br>
        <p class="dare">${this.#prompt}</p>
        <p class="separator">OU</p>
        <p class="consequence">${this.#consequence}</p>
        <div class="emoji-container">${this.#emojis.reduce(
          (prev, current) => `${prev} ${current}`
        )}
        </div>
      </div>`;
  }

  getId() {
    return this.#id;
  }

  getPrompt() {
    return this.#prompt;
  }

  getConsequence() {
    return this.#consequence;
  }

  getEmojis() {
    return this.#emojis;
  }

  equals(other) {
    return this.#id === other.#id;
  }
}
