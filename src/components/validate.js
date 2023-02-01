import { settingsObject } from "./utils";

/* Функция, показывающая элемент ошибки */
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingsObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsObject.errorClass);
};

/* Функция, скрывающая элемент ошибки */
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsObject.inputErrorClass);
  errorElement.classList.remove(settingsObject.errorClass);
  errorElement.textContent = "";
};

/* Функция, проверяющая валидность поля */
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

/* Функция, проверяющая наличие невалидного поля */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/* Функция, изменяющая состояние кнопки отправки данных в зависимости от колбэка hasInvalidInput */
export const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settingsObject.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settingsObject.inactiveButtonClass);
  }
};

/* Функция, добавляющая обработчики события "инпут" всем полям ввода */
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settingsObject.inputSelector)
  ); // Создаем массив из всех полей
  const buttonElement = formElement.querySelector(
    settingsObject.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement); // Вызываем функцию, чтобы кнопка была не активной до ввода текста

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement); // Кнопка будет активной, если оба поля валидны
    });
  });
};

const enableValidation = (settingsObject) => {
  const formList = Array.from(
    document.querySelectorAll(settingsObject.formSelector)
  ); // Создаем массив из всех форм
  formList.forEach((formElement) => {
    // Перебираем полученную коллекцию и для каждой формы вызываем setEventListeners
    setEventListeners(formElement);
  });
};

export { enableValidation };

/* Функция для удаления ошибок при закрытии попапа без отправки формы */
function resetError(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement, config)
  );
  toggleButtonState(formElement, inputList, config);
}

export { resetError };
