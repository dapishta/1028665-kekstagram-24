
import { openImagePopup } from './image-popup.js';

const feed = document.querySelector('.pictures');


function getPicture (obj) {
  const template = document.querySelector('#picture').content.cloneNode(true);
  const img = template.querySelector('.picture__img');
  const likesCount = template.querySelector('.picture__likes');
  const commentsCount = template.querySelector('.picture__comments');
  const picture = template.querySelector('a.picture');
  img.src = obj.url;
  likesCount.textContent = obj.likes;
  commentsCount.textContent = obj.comments.length;
  picture.addEventListener('click', () => openImagePopup (obj));
  feed.appendChild(template);
}

function getFeed (array) {
  console.log(array)
  array.forEach((element) => {
    getPicture(element);
  });
}


export {getPicture, getFeed};

