const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-19",
  headers: {
    authorization: "94ec29ac-22bd-43b3-9cf4-af181143e728",
    "Content-Type": "application/json",
  },
};

const getResponce = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.statusText}`);
};

export const getUserInfo = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  }).then(getResponce);
};

export const getCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  }).then(getResponce);
};

export const editProfileData = (name, about) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(getResponce);
};

export const addNewCard = (name, link) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(getResponce);
};

export const deleteCard = (cardID) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.statusText}`);
    }
  });
};

export const likeCard = (cardID) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then(getResponce);
};

export const deleteLikeCard = (cardID) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(getResponce);
};

export const editProfileAvatar = (avatar) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(getResponce);
};
