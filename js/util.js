const body = document.querySelector('body');

function blockBgScroll () {
  body.classList.add('modal-open');
}

function unblockBgScroll () {
  body.classList.remove('modal-open');
}

function isEscPressed (evt) {
  return evt.key === 'Escape';
}

export {blockBgScroll, unblockBgScroll, isEscPressed};
