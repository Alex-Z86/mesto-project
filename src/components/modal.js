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
  popupList,
  editAvatarButton,
  editAvatarPopup,
  avatarForm,
  avatarLinkInput,
} from "./constants";

import { resetError } from "./validate";
import { settingsObject } from "./utils";
import { getUserInfo } from "./api";

export let userID;

getUserInfo()
  .then((data) => {
    nameProfile.textContent = data.name;
    jobProfile.textContent = data.about;
    avatarProfile.src = data.avatar;
    userID = data._id;
  })
  .catch((err) => {
    console.log("Данные не загрузились: ", err);
  });

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

/* Вешаем слушателeЙ клика на кнопки закрытия всех попапов */
const closeButtons = document.querySelectorAll(".popup__close-icon");
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

/* Реализуем закрытие попапов нажатием на оверлей */
popupList.forEach((popupElement) => {
  /* Вешаем слушателя события "клик на оверлей" для закрытия попапа */
  popupElement.addEventListener("mousedown", function (evt) {
    if (evt.target === popupElement) {
      closePopup(popupElement);
    }
  });
});

export const showSaving = (submit) => {
  submit.textContent = "Сохранение...";
};
export const hideSaving = (submit) => {
  submit.textContent = "Сохранить";
};
