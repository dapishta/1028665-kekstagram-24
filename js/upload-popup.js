import { blockBgScroll, isEscPressed, unblockBgScroll } from './util.js';

const uploadForm = document.querySelector('#upload-select-image')
const uploadPopup = uploadForm.querySelector('.img-upload__overlay');
const uploadFileBtn = uploadForm.querySelector('#upload-file');
const uploadPreview = uploadPopup.querySelector('.img-upload__preview img');
const closeBtn = uploadPopup.querySelector('.img-upload__cancel');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

function onCloseBtnClick () {
  closeUploadPopup();
}

function onEscPress (evt) {
  if (isEscPressed(evt)) {
    evt.preventDefault();
    closeUploadPopup();
  }
}

function openUploadPopup () {
  const file = uploadFileBtn.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadPreview.src = URL.createObjectURL(file);
  }

  closeBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onEscPress);
  uploadPopup.classList.remove('hidden');
  blockBgScroll();

}

function closeUploadPopup () {
  closeBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onEscPress);
  uploadPopup.classList.add('hidden');
  unblockBgScroll();
  uploadForm.reset();
}

function activateUpload () {
  uploadFileBtn.addEventListener('change', openUploadPopup);
}


export {openUploadPopup, activateUpload };
