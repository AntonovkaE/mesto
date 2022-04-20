export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true); 
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._card = this._element.querySelector(".card__img")
    this._card.src = this._link;
    this._card.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListener();
    return this._element;
  }

  _setEventListener() {
    this._likeButton = this._element.querySelector(".card__button_like");
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._element
      .querySelector(".card__button_delete")
      .addEventListener("click", () => this._handleDelete());
    this._element.querySelector(".card__img").addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _handleLike() {
    this._likeButton.classList.toggle("card__button_like_active");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }
}
