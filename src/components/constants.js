/* Выбираем элементы, необходимые для редактирования профиля */
const infoProfile = document.querySelector(".profile__info");
export const nameProfile = infoProfile.querySelector(".profile__name");
export const jobProfile = infoProfile.querySelector(".profile__status");
export const avatarProfile = document.querySelector(".profile__avatar");

export const profileForm = document.forms["profile-form"];
export const nameInput = profileForm.querySelector(".form__item_el_name");
export const jobInput = profileForm.querySelector(".form__item_el_status");
export const profileFormSubmit = profileForm.querySelector(
  ".form__edit-profile-button"
);

/* Выбираем элементы, необходимые для реализации открытия и закрытия модального окна редактирования профиля */
export const editProfilePopup = document.querySelector(".popup__edit-profile");
export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);

/* Выбираем элементы для реализации открытия и закрытия попапа для добавления карточки */
export const addCardPopup = document.querySelector(".popup__add-card");
export const addButton = document.querySelector(".profile__add-button");

export const editAvatarPopup = document.querySelector(".popup__edit-avatar");
export const editAvatarButton = document.querySelector(
  ".profile__edit-avatar-button"
);

/* Формируем массив из попапов */
export const popupList = Array.from(document.querySelectorAll(".popup"));

/* Выбираем элементы, необходимые для создания карточек */
export const elementsList = document.querySelector(".elements__list");
const cardTemplate = document.querySelector("#card").content;
export const elementTemplate = cardTemplate.querySelector(".element");
export const popupFotoView = document.querySelector(".popup__foto-view");
export const popupFotoImage = document.querySelector(".popup__foto-image");
export const popupFotoName = document.querySelector(".popup__foto-name");

/* Выбираем элементы для передачи значений */
export const cardForm = document.forms["card-form"];
export const titleInput = cardForm.querySelector(".form__item_el_title");
export const linkInput = cardForm.querySelector(".form__item_el_link");
export const addCardSubmit = cardForm.querySelector(".form__add-card-button");

export const avatarForm = document.forms["avatar-form"];
export const avatarLinkInput = avatarForm.querySelector(
  ".form__item_el_avatar-link"
);
export const avatarSubmit = avatarForm.querySelector(
  ".form__edit-avatar-button"
);
