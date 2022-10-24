import './pages/index.css';
import {initialCards} from './components.js'
//делали для открытие попапа из профайлов
const addButton = document.querySelector('.profile__add-button')
const profileButton = document.querySelector('.profile__button')
//переменные для того чтобы вносить изменения в профиль
const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__title')
const profileAbout = profile.querySelector('.profile__subtitle')
//делали для поиска всех попапов на странице
const popups = document.querySelectorAll('.popup');
const popupProfile =document.querySelector('.popup_profile')
const popupCardAdd =document.querySelector('.popup_card')
const popupImage =document.querySelector('.popup-image')
// отбратились к body нужно для изменения информации
const popupBody = popupProfile.querySelector('.popup__body')
// отбратились для рендеринга карточек
const elements = document.querySelector('.elements')
const cards =document.querySelector('#cards').content;
const picturePopup = popupImage.querySelector('.popup-image__photo')
const descriptionPopup = popupImage.querySelector('.popup-image__subtitle')
// для измения
const profileForm = popupProfile.querySelector('.popup__body')
const cardForm = popupCardAdd.querySelector('.popup__body')

function openPopup(popup) {
  popup.classList.add('popup_opened')// функция открытия попапов
  document.addEventListener('keydown', popupCloseEsc)// слушатель закрытия попапы на escape
  document.addEventListener('dblclick', popupCloseOverlay)// слушатель закрытия попапы на оверлай
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openedCardPopup(element) {// наполняет попап с карточками
  picturePopup.src = element.src;
  picturePopup.alt = element.alt;
  descriptionPopup.textContent = element.alt;
  openPopup(popupImage);
}

// функция удаления карточки
function deleteCard (cardElement) {
  cardElement.remove();
}

function handleProfileFormSubmit (evt) {//для измения информации в профиле
  evt.preventDefault();
  profileName.textContent = profileForm.name.value;
  profileAbout.textContent = profileForm.about.value;
  closePopup(popupProfile)
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const linkImage = cardForm.link.value;
  const nameImage = cardForm.text.value;
  const newCard = createCard(nameImage, linkImage)
  elements.prepend(newCard);
  closePopup(popupCardAdd)
  document.forms.popupTwo.reset()
}

profileForm.addEventListener('submit', handleProfileFormSubmit);//измение информации//
cardForm.addEventListener('submit', handleCardFormSubmit);//измение информации

function createCard(name, link) {// делелали для создания карточек
  const cardElement = cards.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image')
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.element__title').textContent = name;
  cardImage.addEventListener('click' , evt => {
    openedCardPopup(cardImage);
  });
  cardElement.querySelector('.element__button').addEventListener('click', evt => {// лайк карточки
    evt.target.classList.toggle('element__button_active')
  });
  cardElement.querySelector('.element__delete').addEventListener('click', evt => {// удаление карточки
    deleteCard(cardElement);
  });
  return cardElement;
}

profileButton.addEventListener('click', evt => {
  popupBody.name.value = profileName.textContent;
  popupBody.about.value = profileAbout.textContent;
  openPopup(popupProfile);// открыли попап 1
});


addButton.addEventListener('click', evt => {
  openPopup(popupCardAdd);// открыли попап 2
});

popups.forEach( popup => {
  popup.addEventListener('click', evt => {
    evt.target.classList.contains('popup__close') ? closePopup(popup) : false;
  })
})
//делали для перебора карточек
initialCards.forEach( card => {
  console.log(card.link)
  const newCard = createCard(card.name, card.link)
  elements.prepend(newCard);
})

//закрываем попапы на Esc и оверлей
function popupCloseEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(popupOpened)
  }
}

function popupCloseOverlay(evt) {
  const popupOpened = document.querySelector('.popup_opened')
  if (evt.target.classList.contains('popup')) {
    closePopup(popupOpened)
  }
}
// валидация форм
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add('popup__field_type_error')
  errorElement.textContent = errorMessage
  errorElement.classList.add('popup__span-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove('popup__field_type_error')
  errorElement.classList.remove('popup__span-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
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

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  const buttonElement = formElement.querySelector('.popup__save');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__body'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__content'));

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add('popup__save_inactive');
} else {
  buttonElement.classList.remove('popup__save_inactive');
}
};

enableValidation();
