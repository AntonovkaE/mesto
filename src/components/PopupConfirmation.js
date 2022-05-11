import Popup from './Popup.js';

export default class PopupConfirmation extends Popup {
    constructor(selector, api, handleFormSubmit) {
        super(selector);
        this._api = api;
        this._submitButton = this._popup.querySelector(".form__submit");
        this._initialValueSubmit = this._submitButton.textContent;
        this._handleFormSubmit = handleFormSubmit
    }

    open(card) {
        super.open();
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.renderLoading(true, "Удаление...")
            this._handleFormSubmit(this._card)
                .then(() => this.close())
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.renderLoading(false)
                });
        });
    }

    renderLoading(isLoading, buttonText = 'Сохранение...') {
        if (isLoading) {
            this._submitButton.textContent = buttonText;
        } else {
            this._submitButton.textContent = this._initialValueSubmit
        }
    }
}

