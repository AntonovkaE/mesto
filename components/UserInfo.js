import { inputCardLink } from "../utils/constants";

export default class UserInfo {
	constructor(selectorName, selectorDescription) {
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

  setUserInfo({nameInput, descriptionInput}) {
    console.log(descriptionInput)
    this._name.textContent = nameInput;
    this._description.textContent = descriptionInput;
  }

}