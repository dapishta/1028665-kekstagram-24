import { getFeed } from './feed.js';
import { getData } from './api.js';
import { activateUpload } from './upload-popup.js';

getData(getFeed);
activateUpload();
