import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    //  который собирает данные всех полей формы.
    this._inputList = this._popup.querySelectorAll(".form__item");

    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    console.log('cds')
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      console.log('get inputs')
      this.close()
      console.log('close')
    });
    //  должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  }
  open() {
    super.open();
  }

  close() {
    super.close();
    this._popup.querySelector('form').reset();
    //  ак как при закрытии попапа форма должна ещё и сбрасываться.
  }
}
