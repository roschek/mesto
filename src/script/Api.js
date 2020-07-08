export class Api {
  constructor(options) {
    this.url = options.baseUrl
    this.headers = options.headers;

  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
  }

  updateInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    })
    .then(res => {

      if (res.status>=200||res.status<=299) {
        return res.json();
      } else {

        return Promise.reject(res.status);

      }
    })
  }

  addCardToServer(name, link) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
        
      })

    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`,
      {
        method: 'DELETE',
        headers: this.headers
      })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      })
  }

  
  cardLike(id) {
    return fetch(`${this.url}/cards/like/${id}`,
      {
        method: 'PUT',
        headers: this.headers
      })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      })
  }

  updateUser(link) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link

      })
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
  }
}
