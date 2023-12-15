const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: '02d618db-a613-41d9-960e-ca9498e313c1',
    'Content-Type': 'application/json'
  },
}


// Получение данных карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {      
      if (res.ok) {
        return res.json();
      }      

    // Если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`)
    })
}


// Вывод массива карточке в консоль
console.log(getInitialCards());


// Получение данных профиля
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

    // Если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`)
    });
}

// Смена данных профиля
export function changeUserData(profileTitle, profileDescription) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        name: profileTitle,
        about: profileDescription
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
  });
}

// Смена аватара профиля
export function changeUserImage(profileImage) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileImage
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
  });
}



// Постановка лайка
export function setLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
  })
};

// Удаление лайка
export function removeLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
  })
};


// Создание карточки
export function postCard(placeName, placeLink) {
  return fetch(`${config.baseUrl}/cards`, { 
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: placeLink
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
  })
};

// Удаление карточки
export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
  })
};