import {
  elementsList,
  elementTemplate,
  popupFotoView,
  popupFotoImage,
  popupFotoName,
} from "./constants";

import { openPopup } from "./modal";

import { initialCards } from "./arr";

/* Объявляем функцию создания карточек, клонирующую template-элемент */
function createCard(elementName, elementLink) {
  const cardElement = elementTemplate.cloneNode(true);
  const titleElement = cardElement.querySelector(".element__title");
  const imageElement = cardElement.querySelector(".element__image");

  /* Элементу передаем значения для создания карточек */
  titleElement.textContent = elementName;
  imageElement.src = elementLink;
  imageElement.alt = elementName;

  /* Вешаем на изображение карточки слушатель клика, открывающий попап просмотра изображения */
  imageElement.addEventListener("click", function () {
    openPopup(popupFotoView);
    popupFotoName.textContent = elementName;
    popupFotoImage.src = elementLink;
    popupFotoImage.alt = elementName;
  });

  /* Вешаем слушатель клика на элемент "лайка" и объявляем функцию, отслеживающую этот "лайк" */
  cardElement
    .querySelector(".element__button-heart")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__button-heart_active");
    });

  /* Вешаем слушатель клика на кнопку удаления карточки и объявляем функцию удаления карточки */
  cardElement
    .querySelector(".element__delete-icon")
    .addEventListener("click", function () {
      cardElement.remove();
    });

  return cardElement;
}

function addElement(elementName, elementLink) {
  const elementCard = createCard(elementName, elementLink);
  elementsList.prepend(elementCard);
}

/* Для добавления 6-ти карточек при загрузке, проходим по элементам массива */
initialCards.forEach(function (item) {
  addElement(item.name, item.link);
});

export { addElement };
