export default class UserInfo {
	constructor(selectorName, selectorDescription, api, userId) {
    this._name = document.querySelector(selectorName);
    this._description = document.querySelector(selectorDescription);
    this._api = api;
    this._id = userId;
	}
  getUserInfo() {
    return {
      name: this._name.textContent,
      decription: this._description.textContent
    };
  }

  setUserInfo({nameInput, descriptionInput}) {
    this._name.textContent = nameInput;
    this._description.textContent = descriptionInput;
  }
}