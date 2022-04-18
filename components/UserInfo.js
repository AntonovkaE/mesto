export default class UserInfo {
	constructor({selectorName, selectorDescription}) {
    this._name = document.querySelector(selectorName);
    this._description = document.querySelector(selectorDescription);
	}

  getUserInfo() {
    const user = {
      name: this._name.textContent,
      decription: this._description.textContent
    };
    return user;
    //  возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  }

  setUserInfo() {
    this._name.textContent = popupEditForm.querySelector(".form__item_el_name");;
    this._description = popupEditForm.querySelector(
      ".form__item_el_description"
    )
    // принимает новые данные пользователя и добавляет их на страницу.
  }

}