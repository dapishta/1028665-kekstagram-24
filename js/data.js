const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const MAX_NUM_HASHTAGS = 5;

const errorTypeToMessage = {
  tooMuchHashtags: 'Разрешено не больше 5 хештегов',
  noRepeating: 'Удалите повторяющиеся хештеги',
  other: 'Разрешено использовать английские и русские буквы, а также цифры. Тег должен начинаться с решетки и не может состоять из одной решетки',

};

export {MAX_NUM_HASHTAGS, errorTypeToMessage, FILE_TYPES};
