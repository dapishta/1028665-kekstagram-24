import { blockBgScroll, unblockBgScroll, isEscPressed } from './util.js';
import { MAX_COMMENTS_LOAD } from './data.js';

const popup = document.querySelector('.big-picture');
const img = popup.querySelector('.big-picture__img img');
const likesCount = popup.querySelector('.likes-count');
const commentsCount = popup.querySelector('.comments-count');
const commentsShownCount = popup.querySelector('.comments-shown-count');
const description = popup.querySelector('.social__caption');
const commentsLoader = popup.querySelector('.comments-loader');
const closeButton = popup.querySelector('#picture-cancel');
const commentsList = popup.querySelector('.social__comments');

let allComments;
let commentsToShow;

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

function showComments (array) {
  if (array.length < MAX_COMMENTS_LOAD) {
    array.splice(0,array.length).forEach((element) => {
      setComment(element);
    });
    commentsLoader.classList.add('hidden');
    commentsShownCount.textContent = allComments.length - commentsToShow.length;

  } else {
    array.splice(0,MAX_COMMENTS_LOAD).forEach((element) => {
      setComment(element);
    });
    commentsShownCount.textContent = allComments.length - commentsToShow.length;
    commentsLoader.classList.remove('hidden');
  }
}


function onCommentsLoaderClick () {
  showComments(commentsToShow);
}

function openImagePopup (obj) {
  img.src = obj.url;
  likesCount.textContent = obj.likes;
  commentsCount.textContent = obj.comments.length;
  description.textContent = obj.description;

  commentsList.textContent = '';

  commentsToShow = obj.comments.slice();
  allComments = obj.comments.slice();

  if (commentsToShow) {
    showComments(commentsToShow);
  }

  popup.classList.remove('hidden');

  blockBgScroll();
  closeButton.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onEscPress);

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
}

function closeImagePopup () {
  popup.classList.add('hidden');
  unblockBgScroll();
  closeButton.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onEscPress);
}

export {openImagePopup};
