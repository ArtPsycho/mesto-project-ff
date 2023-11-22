import '../pages/index.css';
import { initialCards } from './cards';
import { openPopup, closePopup } from './modal';
import { createCard, likeCard, removeCard } from './card';


// DOM узлы
const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');



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

// Открытие модального окна "Редактирование профиля"
editOpenButton.addEventListener('click', () => {
  openPopup(editPopup);
  editNameInput.value = profileTitle.textContent;
  editDescriptionInput.value = profileDescription.textContent;
});

// Закрытие модального окна "Редактирование профиля"
editCloseButton.addEventListener('click', () => {
  closePopup(editPopup);
})

// Отправка формы модального окна "Редактирование профиля"
function editFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = editNameInput.value;
  profileDescription.textContent = editDescriptionInput.value;
  
  closePopup(editPopup);
}

// Прикрепление обработчика события к форме модального окна "Редактирование профиля"
editForm.addEventListener('submit', editFormSubmit); 



// Добавление карточки//

// Модальное окно "Добавление карточки"
const addPopup = document.querySelector('.popup_type_new-card');
const addOpenButton = document.querySelector('.profile__add-button');
const addCloseButton = addPopup.querySelector('.popup__close');
const addForm = document.forms['new-place'];
const addNameInput = addForm.elements['place-name'];
const addLinkInput = addForm.elements['link'];

// Открытие модального окна "Добавление карточки"
addOpenButton.addEventListener('click', () => {
  openPopup(addPopup);
})

// Закрытие модального окна "Добавление карточки"
addCloseButton.addEventListener('click', () => {
  closePopup(addPopup);
})

// Отправка формы модального окна "Добавление карточки"
function addFormSubmit(event) {
  event.preventDefault();
  const cardValue = { name: addNameInput.value, link: addLinkInput.value};
  placesList.prepend(createCard(cardValue, removeCard, likeCard, openImage));

  addForm.reset();
  closePopup(addPopup);
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



// Вывод на страницу

// Вывод карточек на страницу
function renderList() {
  initialCards.forEach((cardValue) => {
    placesList.append(createCard(cardValue, removeCard, likeCard, openImage));
  });
}

renderList();