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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

function openPopup(popup) {
  popup.classList.add('popup_opened')// функция открытия попапов
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

function profileChange (evt) {//для измения информации в профиле//
  evt.preventDefault();
  profileName.textContent = profileForm.name.value;
  profileAbout.textContent = profileForm.about.value;
  popupProfile.classList.remove('popup_opened');
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const linkImage = cardForm.link.value;
  const nameImage = cardForm.text.value;
  const newCard = createCard(nameImage, linkImage)
  elements.prepend(newCard);
  popupCardAdd.classList.remove('popup_opened')
  cardForm.text.value = '';
  cardForm.link.value = '';
}

profileForm.addEventListener('submit', profileChange);//измение информации//
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
