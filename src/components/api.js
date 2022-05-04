function checkPromise(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then((res) => {
      return checkPromise(res);
    });
  }

  saveNewCard(nameInput, linkInput, likes) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput,
        link: linkInput,
        likes: likes,
      }),
    }).then((res) => {
      return checkPromise(res);
    });
  }

  getUserData() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then((res) => {
      return checkPromise(res);
    });
  }

  saveUserData(nameInput, descriptionInput) {
    fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput,
        about: descriptionInput,
      }),
    });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return checkPromise(res);
    });
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return checkPromise(res);
    });
  }

  deleteLike(id) {
    return fetch(this._baseUrl + /cards/ + id + "/likes", {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return checkPromise(res);
    });
  }

  changeAvatar(linkInput) {
    fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: linkInput,
      }),
    });
  }
}
