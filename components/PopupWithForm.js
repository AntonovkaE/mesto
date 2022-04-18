import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    //  который собирает данные всех полей формы.
    this._inputList = this._element.querySelectorAll(".form__item");

    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.id] = input.value)
    );

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    //  должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    }
    open() {
    super.open();
  }

  close() {
    this._element.reset();
    //  ак как при закрытии попапа форма должна ещё и сбрасываться.
    super.close();
  }
}
