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

function isBackspacePressed (evt) {
  return evt.key === 'Backspace';
}

export {blockBgScroll, unblockBgScroll, isEscPressed, isBackspacePressed};
