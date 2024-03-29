export class Card {
    constructor(
        card,
        templateSelector,
        userId,
        api,
        handleCardClick,
        handleCardDelete,
    ) {
        this._name = card.name;
        this._link = card.link;
        this._templateSelector = templateSelector;
        this._likes = card.likes;
        this._id = card.id;
        this._api = api;
        this._userId = userId;
        this._handleCardClick = handleCardClick;
        this._owner = card.owner;
        this._handleCardDelete = handleCardDelete;
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector(".card__button_like");
        this._card = this._element.querySelector(".card__img");
        this.deleteButton = this._element.querySelector(".card__button_delete");
        this.cardImage = this._element.querySelector(".card__img")
        this._likeCount = this._element.querySelector(".card__like-counter");
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._card.src = this._link;
        this._card.alt = this._name;
        this._element.querySelector(".card__title").textContent = this._name;
        if (this._likes.length > 0) {
            this._likeCount.textContent =
                this._likes.length;
        }
        if (this._isLiked(this._likes)) {
            this._likeButton.classList.add("card__button_like_active");
        }
        if (this._userId === this._owner || this._owner == undefined) {
            this.deleteButton
                .classList.remove("hidden");
        }

        this._setEventListener();
        return this._element;
    }

    _setEventListener() {
        this._likeButton.addEventListener("click", () => this._handleLike());
        this.deleteButton.addEventListener("click", () => this._handleCardDelete(this));
        this.cardImage.addEventListener("click", () => {
            this._handleCardClick();
        });
    }

    _isLiked(likes) {
        return likes.some(elem => elem._id === this._userId)
    }

    _handleLike() {
        if (this._isLiked(this._likes)) {

            this._api.deleteLike(this._id)
                .then(res => {
                    this._likeButton.classList.toggle("card__button_like_active");
                    if (res.likes.length === 0) {
                        this._likeCount.classList.add('hidden')
                    }
                    this._likes = res.likes;
                    this._likeCount.textContent = res.likes.length;
                }).catch((err) => {
                console.log(err);
            });
        } else {
            this._api.addLike(this._id)
                .then(res => {
                    this._likeButton.classList.toggle("card__button_like_active");

                    if (res.likes.length > 0) {
                        this._likeCount.classList.remove('hidden')
                    }
                    this._likes = res.likes;
                    this._likeCount.textContent = res.likes.length;
                    return res
                })
                .catch((err) => {
                    console.log(err);
                });
        }


    }

    handleDelete() {
                this._element.remove();
                this._element = null;
            }

}
