import {popups, popupProfile, popupCardAdd, popupImage, profile, profileName, profileAbout, addButton, profileButton, elements, cards, picturePopup, descriptionPopup, profileForm, cardForm} from './utils.js';
import {toggleButtonState} from './validate.js';
// функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

export function openPopup(popup) {
  popup.classList.add('popup_opened')// функция открытия попапов
  document.addEventListener('keydown', closeEscPopup)// слушатель закрытия попапы на escape
  document.addEventListener('dblclick', closeOverlayPopup)// слушатель закрытия попапы на оверлай
};

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup)// слушатель закрытия попапы на escape
  document.removeEventListener('dblclick', closeOverlayPopup)
}

export function openedCardPopup(element) {// наполняет попап с карточками
  picturePopup.src = element.src;
  picturePopup.alt = element.alt;
  descriptionPopup.textContent = element.alt;
  openPopup(popupImage);
}

export function handleProfileFormSubmit (evt) {//для измения информации в профиле
  evt.preventDefault();
  profileName.textContent = profileForm.name.value;
  profileAbout.textContent = profileForm.about.value;
  closePopup(popupProfile)
}

export function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const linkImage = cardForm.link.value;
  const nameImage = cardForm.text.value;
  const newCard = createCard(nameImage, linkImage)
  elements.prepend(newCard);
  closePopup(popupCardAdd)
  document.forms.popupTwo.reset()
}

export function createCard(name, link) {// делелали для создания карточек
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

//закрываем попапы на Esc и оверлей
export function closeEscPopup(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
  }
}

export function closeOverlayPopup(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target)
  }
}
