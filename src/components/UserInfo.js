export default class UserInfo {
	constructor(selectorName, selectorDescription, api) {
    this._name = document.querySelector(selectorName);
    this._description = document.querySelector(selectorDescription);
    this._api = api;
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
    this._api.saveUserData(nameInput, descriptionInput)
  }


  // saveUserInfo({nameInput, descriptionInput}) {
  //   this._api.saveUserData({nameInput, descriptionInput})
  //   .then((data) => console.log(data))
  // }
}