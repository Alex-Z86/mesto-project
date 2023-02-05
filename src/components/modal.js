import {
  nameProfile,
  jobProfile,
  avatarProfile,
  nameInput,
  jobInput,
  editProfilePopup,
  editProfileButton,
  addCardPopup,
  addButton,
  profileForm,
  cardForm,
  titleInput,
  linkInput,
  editAvatarButton,
  editAvatarPopup,
  avatarForm,
  avatarLinkInput,
} from "./constants";

import { resetError } from "./validate";
import { settingsObject } from "./utils";

export const updateUserData = (userData) => {
  nameProfile.textContent = userData.name;
  jobProfile.textContent = userData.about;
  avatarProfile.src = userData.avatar;
};

/* Функция закрытия попапа нажатием на Esc */
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    /* Находим открытый попап по классу */
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

/* Объявляем функцию открытия для всех попапов */
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

/* Объявляем функцию закрытия для всех попапов */
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

export { openPopup, closePopup };

/* Вешаем слушатель клика на кнопку открытия модального окна редактирования профиля */
editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
  /* При открытии модального окна присваиваем полям input значения, которые отображаются на странице */
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  resetError(profileForm, settingsObject);
});

/* Вешаем слушатель клика на кнопку открытия модального окна добавления карточки */
addButton.addEventListener("click", () => {
  openPopup(addCardPopup);

  titleInput.value = "";
  linkInput.value = "";

  resetError(cardForm, settingsObject);
});

/* Вешаем слушатель клика на кнопку открытия модального окна редактирования аватарки */
editAvatarButton.addEventListener("click", () => {
  openPopup(editAvatarPopup);

  avatarLinkInput.value = "";

  resetError(avatarForm, settingsObject);
});

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-icon")) {
      closePopup(popup);
    }
  });
});

export const showSaving = (submit) => {
  submit.textContent = "Сохранение...";
};
export const hideSaving = (submit) => {
  submit.textContent = "Сохранить";
};
