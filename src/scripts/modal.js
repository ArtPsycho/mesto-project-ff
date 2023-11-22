// Функция открытие модального окна
function openPopup(element) {
  element.classList.add('popup_is-opened');
  element.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
}


// Функция закрытие модального окна
function closePopup(element) {
  element.classList.remove('popup_is-opened');
  element.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
}


// Функция закрытия модального окна через Esc
function closePopupEsc(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'))
  };
}


// Фунция закрытия модального окна через overlay
function closePopupOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  };
}


export { openPopup, closePopup };
