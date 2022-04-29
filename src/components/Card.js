export class Card {
  constructor(
    card,
    templateSelector,
    user,
    api,
    handleCardClick,
    handleCardDelete
  ) {
    this._cardData = card;
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._likes = card.likes;
    this._id = card.id;
    this._user = user;
    this._api = api;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._card = this._element.querySelector(".card__img");
    this._card.src = this._link;
    this._card.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__like-counter").textContent = this._likes.length;
    console.log(this._likes.length)
    this._setEventListener();
    return this._element;
  }

  _setEventListener() {
    this._likeButton = this._element.querySelector(".card__button_like");
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._element
      .querySelector(".card__button_delete")
      .addEventListener("click", () => this._handleDelete(this._element));
    this._element.querySelector(".card__img").addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _handleLike() {
    this._likeCount = this._element.querySelector(".card__like-counter");
    this._likeButton.classList.toggle("card__button_like_active");
    if (this._likeButton.classList.contains("card__button_like_active")) {
      this._api.addLike(this._id)
          .then((res) => {
              this._likeCount.textContent = res.likes.length
              console.log(res)
            })
    }

    else {
      this._api.deleteLike(this._id)
          .then((res) => {
            this._likeCount.textContent = res.likes.length;
            console.log(res)
          })

  }}

  _handleDelete() {
    this._api
      .deleteCard(this._id)
      .then(() => {
        this._element.remove();
        this._element = null;
      })
      .catch((err) => console.log(err));
    // this._element.remove();
    //
  }
}
