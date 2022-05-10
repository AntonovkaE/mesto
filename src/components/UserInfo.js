export default class UserInfo {
	constructor(selectorName, selectorDescription, selectorAvatar, userId) {
    this._name = document.querySelector(selectorName);
    this._description = document.querySelector(selectorDescription);
    this._avatar = document.querySelector(selectorAvatar);
    this._id = userId;
	}
  getUserInfo() {
    return {
      name: this._name.textContent,
      decription: this._description.textContent,
        userId: this._id
    };
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._description.textContent = about;
  }
  setAvatar(avatar) {
      this._avatar.src = avatar;
  }
}