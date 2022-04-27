export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  getInitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-40/cards", {
      headers: {
        authorization: "242a0c65-83ea-4aa5-aad5-7b82cd182540",
      },
    })
    .then((res) => {if (res.ok)  {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
    )}

  getUserData () {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-40/users/me', {
      headers: {
        authorization: "242a0c65-83ea-4aa5-aad5-7b82cd182540",
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

