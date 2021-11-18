const uploadPopup = document.querySelector('.img-upload__overlay');
const uploadPreview = uploadPopup.querySelector('.img-upload__preview img');
const scaleSmallerBtn = uploadPopup.querySelector('.scale__control--smaller');
const scaleBiggerBtn = uploadPopup.querySelector('.scale__control--bigger');
const scaleControlValue = uploadPopup.querySelector('.scale__control--value');
const filterSliderBlock = uploadPopup.querySelector('.img-upload__effect-level');


const SCALE_STEP = 0.25;
const MAX_SCALE = 1;
const MIN_SCALE = 0.25;
let currentScale = 1;

let currentFilter = 'none';


function setFilterEffect (filterID='effect-none') {
  currentFilter = filterID.slice(7);
  uploadPreview.className = `effects__preview--${currentFilter}`;

  switch (currentFilter) {
    case 'none':
      filterSliderBlock.classList.add('hidden');
      break;
    default:
      filterSliderBlock.classList.remove('hidden');
  }
}

// Наложение эффекта на изображение:
// [x] По умолчанию должен быть выбран эффект «Оригинал».
// [x] На изображение может накладываться только один эффект.
// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.
// Интенсивность эффекта регулируется перемещением ползунка в слайдере. Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider. Уровень эффекта записывается в поле .effect-level__value. При изменении уровня интенсивности эффекта (предоставляется API слайдера), CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.
// При выборе эффекта «Оригинал» слайдер скрывается.
// При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.


function scalePreview (isBigger) {
  if (isBigger) {
    currentScale += SCALE_STEP;
    uploadPreview.style.transform = `scale(${currentScale})`;
  } else {
    currentScale -= SCALE_STEP;
    uploadPreview.style.transform = `scale(${currentScale})`;
  }

  scaleBiggerBtn.disabled = currentScale === MAX_SCALE;
  scaleSmallerBtn.disabled = currentScale === MIN_SCALE;
  scaleControlValue.value = `${currentScale*100}%`;
  uploadPreview.className = `effects__preview--${currentFilter}`;
}

export {scalePreview, setFilterEffect};
