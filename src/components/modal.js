import {
  nameProfile,
  jobProfile,
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
} from "./constants";

import { resetError } from "./validate";
import { settingsObject } from "./utils";

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
