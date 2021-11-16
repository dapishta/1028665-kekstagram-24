import { blockBgScroll, isEscPressed, unblockBgScroll } from './util.js';
import { isBackspacePressed } from './util.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadPopup = uploadForm.querySelector('.img-upload__overlay');
const uploadFileBtn = uploadForm.querySelector('#upload-file');
const uploadPreview = uploadPopup.querySelector('.img-upload__preview img');
const closeBtn = uploadPopup.querySelector('.img-upload__cancel');
const descriptionField = uploadPopup.querySelector('.text__description');
const hashtagsField = uploadPopup.querySelector('.text__hashtags');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const HASHTAG_MAX_LENGTH = 20; 

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

function onHashtagsFieldInput (evt) {
  const inputValue = hashtagsField.value;
  const valueArray = Array.from(inputValue);
  const lastSymbol = valueArray[valueArray.length-1];

  const lastTagArray = valueArray.slice(valueArray.lastIndexOf('#'), valueArray.length);
  const lastTag = lastTagArray.join('');

  const isTagValid = (lastTagArray.length > 1 ) ? re.test(lastTag) : true;

  console.log(`Результат проверки: ${isTagValid}. Длинна массива посл. тега: ${lastTagArray.length}. П символ: ${lastTagArray[lastTagArray.length-1]}`);

  if (lastTagArray[0] !== '#') {
    hashtagsField.setCustomValidity('Пожалуйста, начните с решетки');
  } else if (lastTagArray.length > HASHTAG_MAX_LENGTH) {
    hashtagsField.setCustomValidity(`Максимум символов в теге: 20. Уменьшите на ${lastTagArray.length - HASHTAG_MAX_LENGTH}`);
  } else if (lastTagArray[lastTagArray.length-1] === ' ') {
    hashtagsField.value += '#';
  } else if (lastTagArray[lastTagArray.length-1] === '#'){
    hashtagsField.setCustomValidity('Хештег не может состоять из одной решетки');
  } else if (!isTagValid) {
    hashtagsField.setCustomValidity('Используйте корректные сиволы. Разрешены к использования английские и русские буквы, а также цифры');
  } else {
    hashtagsField.setCustomValidity('');
  }

  // if (lastSymbol === '#' && evt.key === 'Backspace') {
  //   hashtagsField.value = inputValue.substring(0, inputValue.length-1);
  // }

  hashtagsField.reportValidity();
}

function onCloseBtnClick () {
  closeUploadPopup();
}

function onEscPress (evt) {
  if (isEscPressed(evt)) {
    evt.preventDefault();
    closeUploadPopup();
  }
}

function onFieldFocus (evt) {
  document.removeEventListener('keydown', onEscPress);

  if (evt.target.matches('.text__hashtags')){
    if (!hashtagsField.value) {
      hashtagsField.value += '#';
    }
  }
}

function onFieldBlur (evt) {
  document.addEventListener('keydown', onEscPress);
}

function onUploadFormSubmit (evt) {
  // evt.preventDefault();
}

function openUploadPopup () {
  const file = uploadFileBtn.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadPreview.src = URL.createObjectURL(file);
  }
  uploadForm.addEventListener('submit', onUploadFormSubmit);

  descriptionField.addEventListener('focus', onFieldFocus);
  descriptionField.addEventListener('blur', onFieldBlur);

  hashtagsField.addEventListener('focus', onFieldFocus);
  hashtagsField.addEventListener('blur', onFieldBlur);
  hashtagsField.addEventListener('input', onHashtagsFieldInput);
  hashtagsField.addEventListener('keydown', onHashtagsFieldInput);

  closeBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onEscPress);
  uploadPopup.classList.remove('hidden');
  blockBgScroll();

}

function closeUploadPopup () {
  closeBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onEscPress);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
  uploadPopup.classList.add('hidden');
  unblockBgScroll();
  uploadForm.reset();
}

function activateUpload () {
  uploadFileBtn.addEventListener('change', openUploadPopup);
}


export {openUploadPopup, activateUpload };
