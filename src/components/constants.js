/* Выбираем элементы, необходимые для редактирования профиля */
const infoProfile = document.querySelector(".profile__info");
export const nameProfile = infoProfile.querySelector(".profile__name");
export const jobProfile = infoProfile.querySelector(".profile__status");

export const profileForm = document.forms["profile-form"];
export const nameInput = profileForm.querySelector(".form__item_el_name");
export const jobInput = profileForm.querySelector(".form__item_el_status");

/* Выбираем элементы, необходимые для реализации открытия и закрытия модального окна редактирования профиля */
export const editProfilePopup = document.querySelector(".popup__edit-profile");
export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);

/* Выбираем элементы для реализации открытия и закрытия попапа для добавления карточки */
export const addCardPopup = document.querySelector(".popup__add-card");
export const addButton = document.querySelector(".profile__add-button");

/* Формируем массив из всех попапов для реализации закрытия попапов кликом на Esc и кликом на оверлей */
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
