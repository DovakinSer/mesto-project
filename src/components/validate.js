// валидация форм
export const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add('popup__field_type_error')
  errorElement.textContent = errorMessage
  errorElement.classList.add('popup__span-error_active');
};

export const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove('popup__field_type_error')
  errorElement.classList.remove('popup__span-error_active');
  errorElement.textContent = '';
};

export const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
};

export const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  const buttonElement = formElement.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
  formElement.addEventListener('reset', () => {// 4 шаг
    toggleButtonState(inputList, buttonElement); //какой из двух вариантов сюда передать? А то вроде как оба не работают
    //buttonElement.setAttribute('disabled', true);
  })
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__body'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement); // 2)второй шаг сделать еще внутри перебора setEventListeners(formElement);
    // 1)удалить массив филдсетов - const fieldsetList = Array.from(formElement.querySelectorAll('.popup__content'));

    //fieldsetList.forEach((fieldSet) => {
      //setEventListeners(fieldSet);
    //}); 3) шаг удалить перебор
  });
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

export const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__save_inactive');
} else {
    buttonElement.classList.remove('popup__save_inactive');
    buttonElement.disabled = false;
}
};


