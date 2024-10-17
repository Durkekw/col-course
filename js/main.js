import { photoDescription } from './data.js';
import { renderPictures } from './picture.js';
import { showForm } from './form.js';
import { resetScale } from './scale.js';
import {} from './effects.js';
// import { showBigPicture } from "./big-picture.js";

renderPictures(photoDescription());
showForm();
resetScale();
// console.log(photoDescription());
