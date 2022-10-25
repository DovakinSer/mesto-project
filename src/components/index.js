import '../pages/index.css';
import {initialCards} from './card.js'
import {addButton, profileButton, profile, profileName, profileAbout, popups, popupProfile, popupCardAdd, popupImage, popupBody, elements, cards, picturePopup, descriptionPopup, profileForm, cardForm} from './utils.js';
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState} from './validate.js'
import {openPopup, closePopup, openedCardPopup, handleProfileFormSubmit, handleCardFormSubmit, createCard, closeEscPopup, closeOverlayPopup, deleteCard} from './modal.js'




profileForm.addEventListener('submit', handleProfileFormSubmit);//измение информации//
cardForm.addEventListener('submit', handleCardFormSubmit);//измение информации

profileButton.addEventListener('click', evt => {
  popupBody.name.value = profileName.textContent;
  popupBody.about.value = profileAbout.textContent;
  openPopup(popupProfile);// открыли попап 1
});

addButton.addEventListener('click', evt => {
  openPopup(popupCardAdd);// открыли попап 2
  submitButtonSelector.disabled = true;
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

enableValidation({
  formSelector: '.popup__body',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__span-error',
  errorClass: 'popup__span-error_active'
});
