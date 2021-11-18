import { getFeed } from './feed.js';
import { getData } from './api.js';
import { activateUpload } from './upload-popup.js';

const sliderElement = document.querySelector('.effect-level__slider');


getData(getFeed);
activateUpload();
