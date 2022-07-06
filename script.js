//делали для открытие попапа из профайлов
const addButton = document.querySelector('.profile__add-button')
const profileButton = document.querySelector('.profile__button')
//переменные для того чтобы вносить изменения в профиль
const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__title')
const profileAbout = profile.querySelector('.profile__subtitle')
//Переменные кнопок закртия попапов
const closePopupOne = document.querySelector('#popup-one-close');
const closePopupTwo = document.querySelector('#popup-two-close');
const closePopupThree = document.querySelector('#popup-three-close');
//делали для поиска всех попапов на странице
const popups = document.querySelector('.popup');
const popupOne =document.querySelector('.popup-one')
const popupTwo =document.querySelector('.popup-two')
const popupThree =document.querySelector('.popup-image')
// отбратились к body нужно для изменения информации
const popupBody = popupOne.querySelector('.popup__body')
// отбратились для рендеринга карточек
const elements = document.querySelector('.elements')
const cards =document.querySelector('#cards').content;
const picturePopup = popupThree.querySelector('.popup-image__photo')
const descriptionPopup = popupThree.querySelector('.popup-image__subtitle')
// для измения
const profileForm = popupOne.querySelector('.popup__body')
const cardForm = popupTwo.querySelector('.popup__body')

function openPopup(popup) {
  popup.classList.add('popup_opened')// функция открытия попапов
};

function openedCardPopup(element) {// наполняет попап с карточками
  picturePopup.src = element.src;
  picturePopup.alt = element.alt;
  descriptionPopup.textContent = element.alt;
  openPopup(popupThree);
}
// функция удаления карточки
function deleteCard (cardElement) {
  cardElement.remove();
}

function Profile (evt) {//для измения информации в профиле
  evt.preventDefault();
  profileName.textContent = profileForm.name.value;
  profileAbout.textContent = profileForm.about.value;
  popupOne.classList.remove('popup_opened');
}

function cardProfile(evt) {
  evt.preventDefault();
  const linkImage = cardForm.link.value;
  const nameImage = cardForm.text.value;
  const newCard = createCard(nameImage, linkImage)
  elements.prepend(newCard);
  popupTwo.classList.remove('popup_opened')
  cardForm.text.value = '';
  cardForm.link.value = '';
}

profileForm.addEventListener('submit', Profile);//измение информации
cardForm.addEventListener('submit', cardProfile);//измение информации

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
  openPopup(popupOne);// открыли попап 1
});

closePopupOne.addEventListener('click', function() {
  popupOne.classList.remove('popup_opened');// закрыли попап 1
})


addButton.addEventListener('click', evt => {
  openPopup(popupTwo);// открыли попап 2
});

closePopupTwo.addEventListener('click', function() {
  popupTwo.classList.remove('popup_opened');// закрыли попап 2
})


closePopupThree.addEventListener('click', function() {
  popupThree.classList.remove('popup_opened');// закрыли попап 3
})

//делали для перебора карточек
initialCards.forEach( card => {
  console.log(card.link)
  const newCard = createCard(card.name, card.link)
  elements.prepend(newCard);
})


//profileForm.addEventListener('submit', Profile);
//cardForm.addEventListener('submit', cardProfile);

