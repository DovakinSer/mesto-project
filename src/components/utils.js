export const settings = {
  formSelector: '.popup__body',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__span-error_active'
};

//делали для открытие попапа из профайлов
export const addButton = document.querySelector('.profile__add-button')
export const profileButton = document.querySelector('.profile__button')
//переменные для того чтобы вносить изменения в профиль
export const profile = document.querySelector('.profile')
export const profileName = profile.querySelector('.profile__title')
export const profileAbout = profile.querySelector('.profile__subtitle')
//делали для поиска всех попапов на странице
export const popups = document.querySelectorAll('.popup');
export const popupProfile =document.querySelector('.popup_profile')
export const popupCardAdd =document.querySelector('.popup_card')
export const popupImage =document.querySelector('.popup-image')
// отбратились к body нужно для изменения информации
export const popupBody = popupProfile.querySelector('.popup__body')
// отбратились для рендеринга карточек
export const elements = document.querySelector('.elements')
export const cards =document.querySelector('#cards').content;
export const picturePopup = popupImage.querySelector('.popup-image__photo')
export const descriptionPopup = popupImage.querySelector('.popup-image__subtitle')
// для измения
export const profileForm = popupProfile.querySelector('.popup__body')
export const cardForm = popupCardAdd.querySelector('.popup__body')

