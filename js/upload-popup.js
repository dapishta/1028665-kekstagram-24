import { blockBgScroll, isEscPressed, unblockBgScroll } from './util.js';
import { checkHashtags } from './hashtags.js';
import { FILE_TYPES } from './data.js';
import { scalePreview, setFilterEffect } from './edit-image.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadPopup = uploadForm.querySelector('.img-upload__overlay');
const uploadFileBtn = uploadForm.querySelector('#upload-file');
const uploadPreview = uploadPopup.querySelector('.img-upload__preview img');
const closeBtn = uploadPopup.querySelector('.img-upload__cancel');
const descriptionField = uploadPopup.querySelector('.text__description');
const hashtagsField = uploadPopup.querySelector('.text__hashtags');
const scaleSmallerBtn = uploadPopup.querySelector('.scale__control--smaller');
const scaleBiggerBtn = uploadPopup.querySelector('.scale__control--bigger');
const effectsListInputs = uploadPopup.querySelectorAll('.effects__list input');


function onHashtagsFieldInput () {
  const inputValue = hashtagsField.value;
  if (inputValue) {
    hashtagsField.setCustomValidity(checkHashtags(inputValue));
    hashtagsField.reportValidity();
  }
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

function onFieldFocus () {
  document.removeEventListener('keydown', onEscPress);
}

function onFieldBlur () {
  document.addEventListener('keydown', onEscPress);
}


function onUploadFormSubmit (evt) {
  evt.preventDefault();
}


function onScaleBiggerBtnClick () {
  scalePreview(true);
}

function onScaleSmallerBtnClick () {
  scalePreview(false);
}


// Open popup

function onUploadFileButtonChange () {
  const file = uploadFileBtn.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadPreview.src = URL.createObjectURL(file);
  }
  uploadForm.addEventListener('submit', onUploadFormSubmit);

  descriptionField.addEventListener('focus', onFieldFocus);
  descriptionField.addEventListener('blur', onFieldBlur);

  setFilterEffect();
  hashtagsField.addEventListener('focus', onFieldFocus);
  hashtagsField.addEventListener('blur', onFieldBlur);
  hashtagsField.addEventListener('input', onHashtagsFieldInput);
  hashtagsField.addEventListener('keydown', onHashtagsFieldInput);
  scaleBiggerBtn.addEventListener('click', onScaleBiggerBtnClick);
  scaleSmallerBtn.addEventListener('click', onScaleSmallerBtnClick);
  effectsListInputs.forEach((element)=> element.addEventListener('click', (evt)=> setFilterEffect(evt.target.id)));
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
  uploadFileBtn.addEventListener('change', onUploadFileButtonChange);
}


export { activateUpload };
