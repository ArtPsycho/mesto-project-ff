import { setLike, removeLike, deleteCard } from "./api";

let checkIsLiked;

// Функция создания карточки
function createCard (cardValue, userId, removeCard, likeCard, openImage) {

  // Темплейт карточки  
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  // Присвоение значений
  cardElement.querySelector('.card__title').textContent = cardValue.name;
  cardElement.querySelector('.card__image').src = cardValue.link;
  cardElement.querySelector('.card__image').alt = cardValue.name;

  
  // Удаление карточки
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', (event) => removeCard(event, cardValue));

  // Удаленение кнопки "удалить", не принадлежащей пользователю
  if (cardValue.owner._id !== userId) {
    deleteButton.remove();
  }

  // Лайк карточки
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  likeButton.addEventListener('click', (event) => likeCard(event, cardValue, userId));

  // Количество лайков на карточке
  if (cardValue.likes.length > 0) {
    likeCount.textContent = cardValue.likes.length;
  } else {
    likeCount.textContent = '0';
  }

  // Состояние кнопки лайка
  if (isLikedByUser(cardValue, userId)) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }
  
  // Открытие карточки
  const imageClick = cardElement.querySelector('.card__image');

  imageClick.addEventListener('click', () => {
    openImage(cardValue);
  });

  return cardElement;
}

// Функция удаления карточки
function removeCard (event, cardValue) {
  const card = event.target.closest('.card');

  deleteCard(cardValue._id)
    .then (() => {
      card.remove();
    })
    .catch((error) => {
      console.log(error);
    })  
};


// Наличие лайка от пользователя
function isLikedByUser(cardValue, userId) {
  return cardValue.likes.some(owner => owner._id === userId);
} 
 
// Функция простановки лайка
function likeCard(event, cardValue, userId) {
  const likeButton = event.target;
  const likeCounter = likeButton.closest('.card__like').querySelector('.card__like-count');
  const isLiked = isLikedByUser(cardValue, userId);

  if (isLiked) {
    removeLike(cardValue._id)
    .then(res => {
      cardValue.likes = res.likes;
      likeButton.classList.remove('card__like-button_is-active');
      likeCounter.textContent = res.likes.length;
    })  
    .catch((error) => {
      console.log(error);
    })
    } else {
    setLike(cardValue._id)
    .then(res => {
      cardValue.likes = res.likes;
      likeButton.classList.add('card__like-button_is-active');
      likeCounter.textContent = res.likes.length;
    })
    .catch(error => {
      console.log(error);
    })
  }
}


export { createCard, likeCard, removeCard };