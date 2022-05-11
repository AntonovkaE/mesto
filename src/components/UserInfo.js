export default class UserInfo {
	constructor(selectorName, selectorDescription, selectorAvatar, userId) {
    this._name = document.querySelector(selectorName);
    this._description = document.querySelector(selectorDescription);
    this._avatar = document.querySelector(selectorAvatar);
    this._id = userId;
	}
  getUserInfo() {
    return {
      nameInput: this._name.textContent,
        descriptionInput: this._description.textContent,
        userId: this._id
    };
  }

  setUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._description.textContent = about;
    this.setAvatar(avatar);
    this._id = _id
  }

  setAvatar(avatar) {
      this._avatar.src = avatar;
  }
}