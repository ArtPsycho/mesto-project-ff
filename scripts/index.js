// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');


// @todo: Функция создания карточки
function addCard (element, remove) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', remove);

  return cardElement;
}


// @todo: Функция удаления карточки
function removeCard (event) {
  const card = event.target.closest('.card');
  card.remove();
}


// @todo: Вывести карточки на страницу
function renderList() {
  initialCards.forEach((element) => {
    placesList.append(addCard(element, removeCard));
  });
}

renderList();



// Прямой вывод

// initialCards.forEach(function (element) {
//   const initialCardsElement = cardTemplate.cloneNode(true);
  
//   initialCardsElement.querySelector('.card__title').textContent = element.name;
//   initialCardsElement.querySelector('.card__image').src = element.link;
  
//   placesList.append(initialCardsElement);
// })