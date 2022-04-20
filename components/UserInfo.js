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
  
  }

  setUserInfo({nameInput, descriptionInput}) {
    this._name.textContent = nameInput;
    this._description.textContent = descriptionInput;
  }

}