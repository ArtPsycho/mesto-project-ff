import '../pages/index.css';
import { openPopup, closePopup } from './modal';
import { createCard, likeCard, removeCard } from './card';
import { enableValidation, clearValidation } from './validation';
import { getInitialCards, getUserData, changeUserData, changeUserImage, postCard } from './api';

// DOM узлы
const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');

let userId;

// Конфигурация валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Редактирование профиля//

// Модальное окно "Редактирование профиля"
const editPopup = document.querySelector('.popup_type_edit');
const editOpenButton = document.querySelector('.profile__edit-button');
const editCloseButton = editPopup.querySelector('.popup__close');
const editForm = document.forms['edit-profile'];
const editNameInput = editForm.elements['name'];
const editDescriptionInput = editForm.elements['description'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editPopupSaveButton = editForm.querySelector('.popup__button');

// Открытие модального окна "Редактирование профиля"
editOpenButton.addEventListener('click', () => {
  openPopup(editPopup);
  editNameInput.value = profileTitle.textContent;
  editDescriptionInput.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig);
});

// Закрытие модального окна "Редактирование профиля"
editCloseButton.addEventListener('click', () => {
  closePopup(editPopup);
})

// Отправка формы модального окна "Редактирование профиля"
function editFormSubmit(event) {
  event.preventDefault();
  editPopupSaveButton.textContent = 'Сохранение...';

  changeUserData(editNameInput.value, editDescriptionInput.value)
    .then(() => {
      profileTitle.textContent = editNameInput.value;
      profileDescription.textContent = editDescriptionInput.value;
      closePopup(editPopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      editPopupSaveButton.textContent = 'Сохранение';
    });
}

// Прикрепление обработчика события к форме модального окна "Редактирование профиля"
editForm.addEventListener('submit', editFormSubmit); 

// Редактирование картинки профиля
const avatarPopup = document.querySelector('.popup_type_avatar');
const profileImage = document.querySelector('.profile__image');
const avatarForm = document.forms['new-avatar'];
const avatarInput = avatarForm.elements['link'];
const avatarCloseButton = avatarPopup.querySelector('.popup__close');
const avatarPopupSaveButton = avatarForm.querySelector('.popup__button');

// Открытие модального окна "Обновить аватар"
profileImage.addEventListener('click', () => {
  avatarForm.reset();
  openPopup(avatarPopup);
  clearValidation(avatarForm, validationConfig);
})

// Закрытие модального окна "Обновить профиль"
avatarCloseButton.addEventListener('click', () => {
  closePopup(avatarPopup);
})

// Отправка формы модального окна "Обновить профиль"
function avatarFormSubmit(event) {
  event.preventDefault();
  avatarPopupSaveButton.textContent = 'Сохранение...';

  changeUserImage(avatarInput.value)
  .then(() => {
    profileImage.style = `background-image: url('${avatarInput.value}')`;
    closePopup(avatarPopup);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    avatarPopupSaveButton.textContent = 'Сохранение';
  })
}

// Прикрепление обработчика события к форме модального окна "Обновление аватара"
avatarForm.addEventListener('submit', avatarFormSubmit);

// Добавление карточки//

// Модальное окно "Добавление карточки"
const addPopup = document.querySelector('.popup_type_new-card');
const addOpenButton = document.querySelector('.profile__add-button');
const addCloseButton = addPopup.querySelector('.popup__close');
const addForm = document.forms['new-place'];
const addNameInput = addForm.elements['place-name'];
const addLinkInput = addForm.elements['link'];
const addPopupSaveButton = addForm.querySelector('.popup__button');
console.log(addPopupSaveButton);

// Открытие модального окна "Добавление карточки"
addOpenButton.addEventListener('click', () => {
  addForm.reset();
  openPopup(addPopup);
  clearValidation(addForm, validationConfig);
})

// Закрытие модального окна "Добавление карточки"
addCloseButton.addEventListener('click', () => {
  closePopup(addPopup);
})

// Отправка формы модального окна "Добавление карточки"
function addFormSubmit(event) {
  event.preventDefault();
  addPopupSaveButton.textContent = 'Сохранение...';

  postCard(addNameInput.value, addLinkInput.value)
    .then((cardValue) => {
      placesList.prepend(createCard(cardValue, userId, removeCard, likeCard, openImage));
      addForm.reset();
      closePopup(addPopup);
    })
    .catch((error) => {
      console.log(error);
    })  
    .finally(() => {
      addPopupSaveButton.textContent = 'Сохранить';
    })
}

// Прикрепление обработчика события к форме модального окна "Добавление карточки"
addForm.addEventListener('submit', addFormSubmit);

// Открытие картинки

// Модальное окно "Картинка"
const imagePopup = document.querySelector('.popup_type_image');
const imageCloseButton = imagePopup.querySelector('.popup__close');
const imageCard = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');

// Функция открытия модального окна "Картинка"
function openImage(cardValue) {
  imageCaption.textContent = cardValue.name;
  imageCard.src = cardValue.link;
  imageCard.alt = cardValue.name;
  openPopup(imagePopup);
}

// Закрытие модального окна "Картинка"
imageCloseButton.addEventListener('click', () => {
  closePopup(imagePopup);
})

// Валидация форм
enableValidation(validationConfig);

Promise.all([getInitialCards(), getUserData()])
  .then(([initialCardsData, userData]) => {
    userId = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style = `background-image: url('${userData.avatar}')`;

    initialCardsData.forEach((cardValue) => {
      placesList.append(createCard(cardValue, userId, removeCard, likeCard, openImage));
    });
  })
  .catch((error) => {
    console.log(error);
  })



