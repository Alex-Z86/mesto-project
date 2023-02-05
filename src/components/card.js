import {
  elementsList,
  elementTemplate,
  popupFotoView,
  popupFotoImage,
  popupFotoName,
} from "./constants";

import { openPopup, userID } from "./modal";
import { getCards, deleteCard, likeCard, deleteLikeCard } from "./api";

/* Объявляем функцию создания карточек, клонирующую template-элемент */
function createCard(
  elementName,
  elementLink,
  elementLikes,
  elementLikeNumber,
  cardID,
  elementOwnerId
) {
  const cardElement = elementTemplate.cloneNode(true);
  const titleElement = cardElement.querySelector(".element__title");
  const imageElement = cardElement.querySelector(".element__image");
  const likeElement = cardElement.querySelector(".element__button-heart");
  const likeNumberElement = cardElement.querySelector(
    ".element__button-heart-number"
  );
  const deleteIcon = cardElement.querySelector(".element__delete-icon");

  /* Элементу передаем значения для создания карточек */
  titleElement.textContent = elementName;
  imageElement.src = elementLink;
  imageElement.alt = elementName;

  /* Проверяем список лайков картинки, чтобы понять если среди них мой */
  let likedByMe = false;
  elementLikes.every((like) => {
    if (like._id !== userID) {
      return true;
    }
    likedByMe = true;
    return false;
  });

  /* Отмечаем лайкнутые мной картинки */
  if (likedByMe) {
    likeElement.classList.toggle("element__button-heart_active");
  }

  /* Проставляем количество лайков */
  if (elementLikeNumber.length > 0) {
    likeNumberElement.textContent = elementLikeNumber.length;
  } else {
    likeNumberElement.textContent = "";
  }

  if (elementOwnerId !== userID) {
    deleteIcon.classList.add("element__delete-icon_none");
  }

  /* Вешаем на изображение карточки слушатель клика, открывающий попап просмотра изображения */
  imageElement.addEventListener("mousedown", function () {
    openPopup(popupFotoView);
    popupFotoName.textContent = elementName;
    popupFotoImage.src = elementLink;
    popupFotoImage.alt = elementName;
  });

  /* Вешаем слушатель клика на элемент "лайка" и объявляем функцию, отслеживающую этот "лайк" */
  likeElement.addEventListener("click", function (evt) {
    if (likedByMe) {
      deleteLikeCard(cardID)
        .then((data) => {
          if (data.likes.length === 0) {
            likeNumberElement.textContent = "";
          } else {
            likeNumberElement.textContent = data.likes.length;
          }
          evt.target.classList.toggle("element__button-heart_active", false);
          likedByMe = false;
        })
        .catch((err) => {
          console.log(`Не удалось снять свой лайк: ${err}`);
        });
    } else {
      likeCard(cardID)
        .then((data) => {
          likeNumberElement.textContent = data.likes.length;
          evt.target.classList.toggle("element__button-heart_active", true);
          likedByMe = true;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  /* Вешаем слушатель клика на кнопку удаления карточки и объявляем функцию удаления карточки */
  deleteIcon.addEventListener("click", function () {
    deleteCard(cardID)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return cardElement;
}

function addElement(
  elementName,
  elementLink,
  elementLikes,
  elementLikeNumber,
  cardID,
  elementOwnerId
) {
  const elementCard = createCard(
    elementName,
    elementLink,
    elementLikes,
    elementLikeNumber,
    cardID,
    elementOwnerId
  );
  elementsList.prepend(elementCard);
}

getCards()
  .then((data) => {
    data.forEach((element) => {
      addElement(
        element.name,
        element.link,
        element.likes,
        element.likes,
        element._id,
        element.owner._id
      );
    });
  })
  .catch((err) => {
    console.log("Не удалось загрузить карточки: ", err);
  });

export { addElement };
