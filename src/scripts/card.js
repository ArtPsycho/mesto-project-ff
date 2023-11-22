// Функция создания карточки
function addCard (cardValue, remove, likeCard, imageOpen) {
  
  // Темплейт карточки  
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  // Присвоение значений
  cardElement.querySelector('.card__title').textContent = cardValue.name;
  cardElement.querySelector('.card__image').src = cardValue.link;
  cardElement.querySelector('.card__image').alt = cardValue.name;
  
  // Удаление карточки
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', remove);

  // Лайк карточки
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCard);

  // Открытие карточки
  const imageClick = cardElement.querySelector('.card__image');
  imageClick.addEventListener('click', () => {
    imageOpen(cardValue);
  });

  return cardElement;
}


// Функция удаления карточки
function removeCard (event) {
  const card = event.target.closest('.card');
  card.remove();
}


// Функция простановки лайка
function likeCard (event) {
  event.target.classList.toggle('card__like-button_is-active');
}


export { addCard, likeCard, removeCard };

