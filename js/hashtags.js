import { MAX_NUM_HASHTAGS, errorTypeToMessage } from './data.js';

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

function isHashtagValid (hashtag) {
  return (hashtag) ? re.test(hashtag) : true;
}

function areHashTagsRepeating (hashtag, index, array) {
  return array.indexOf(hashtag) !== array.lastIndexOf(hashtag);
}

function checkHashtags(string) {
  const hashtagsArray = string.toLowerCase().split(' ');

  if (hashtagsArray.length > MAX_NUM_HASHTAGS) {
    return errorTypeToMessage.tooMuchHashtags;
  }

  if (hashtagsArray.some(areHashTagsRepeating)) {
    return errorTypeToMessage.noRepeating;
  }

  return hashtagsArray.every(isHashtagValid) ? '' : errorTypeToMessage.other;
}

export {checkHashtags};
