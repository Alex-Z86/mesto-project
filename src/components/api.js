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

function request(url, options) {
  return fetch(url, options).then(getResponce);
}

export const getUserInfo = () => {
  return request(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  });
};

export const getCards = () => {
  return request(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  });
};

export const editProfileData = (name, about) => {
  return request(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};

export const addNewCard = (name, link) => {
  return request(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
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
  return request(`${apiConfig.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: apiConfig.headers,
  });
};

export const deleteLikeCard = (cardID) => {
  return request(`${apiConfig.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  });
};

export const editProfileAvatar = (avatar) => {
  return request(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  });
};
