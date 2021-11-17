import { blockBgScroll, unblockBgScroll } from './util.js';
import { isEscPressed } from './util.js';

const popup = document.querySelector('.big-picture');
const img = popup.querySelector('.big-picture__img img');
const likesCount = popup.querySelector('.likes-count');
const commentsCount = popup.querySelector('.comments-count');
const description = popup.querySelector('.social__caption');
const commentsShownCount = popup.querySelector('.social__comment-count');
const commentsLoader = popup.querySelector('.comments-loader');
const closeButton = popup.querySelector('#picture-cancel');
const commentsList = popup.querySelector('.social__comments');

function onCloseBtnClick () {
  closeImagePopup();
}

function onEscPress (evt) {
  if (isEscPressed(evt)) {
    evt.preventDefault();
    closeImagePopup();
  }
}

function setComment (obj) {
  const comment = `
    <li class="social__comment">
      <img class="social__picture" src="${obj.avatar}" alt="${obj.name}" width="35" height="35">
      <p class="social__text">${obj.message}</p>
    </li>`;

  commentsList.insertAdjacentHTML('beforeend', comment);
}

function openImagePopup (obj) {
  img.src = obj.url;
  likesCount.textContent = obj.likes;
  commentsCount.textContent = obj.comments.length;
  description.textContent = obj.description;

  commentsList.textContent = '';

  if (obj.comments) {
    if (obj.comments.length >= 5) {
      obj.comments.splice(0,5).forEach((element) => {
        setComment(element);
      });
    } else {
      obj.comments.forEach((element) => {
        setComment(element);
      });
      commentsLoader.classList.add('hidden');
      commentsShownCount.classList.add('hidden');
    }
  }

  popup.classList.remove('hidden');

  blockBgScroll();
  closeButton.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onEscPress);
}

function closeImagePopup () {
  popup.classList.add('hidden');
  unblockBgScroll();
  closeButton.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onEscPress);
}

export {openImagePopup};
