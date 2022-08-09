export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }
  _checkPromise(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then((res) => {
      return this._checkPromise(res);
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
      return this._checkPromise(res);
    });
  }

  getUserData() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then((res) => {
      return this._checkPromise(res);
    });
  }

  saveUserData(nameInput, descriptionInput) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput,
        about: descriptionInput,
      }),
    })
      .then((res) => {
        return this._checkPromise(res);
      })}

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        return this._checkPromise(res);
      })
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkPromise(res);
    });
  }

  deleteLike(id) {
    return fetch(this._baseUrl + /cards/ + id + "/likes", {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkPromise(res);
    });
  }

  changeAvatar(linkInput) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: linkInput,
      }),
    })
        .then((res) => {
          return this._checkPromise(res);
        });
  }
}