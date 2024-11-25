import {createPictureElement, renderPictures} from './picture';
import {getRandomPositiveInteger, findRepeat} from './util';

const randArr = [];
const container = document.querySelector('.pictures');
const defaultBtn = document.querySelector('#filter-default');
const randomBtn = document.querySelector('#filter-random');
const discussedBtn = document.querySelector('#filter-discussed');

const disableAllBtns = (bool) => {
  defaultBtn.disabled = bool;
  randomBtn.disabled = bool;
  discussedBtn.disabled = bool;
};

const defaultFilt = (data) =>{
  document.querySelectorAll('.picture').forEach((elem) => elem.remove());
  renderPictures(data);
};

const randomFilt = (pictures) =>{
  document.querySelectorAll('.picture').forEach((elem) => elem.remove());
  const listFragment = document.createDocumentFragment();
  for (let i = 0; i < 10; i++) {
    const pictureElement = createPictureElement(pictures[findRepeat(randArr, getRandomPositiveInteger(0, pictures.length - 1), 0, pictures.length - 1)]);
    listFragment.appendChild(pictureElement);
  }
  return container.appendChild(listFragment);
};

const discussedFilt = (pictures) =>{
  document.querySelectorAll('.picture').forEach((elem) => elem.remove());
  const key = 'comments';
  const sortedElements = [...pictures].sort((a, b) => b[key].length - a[key].length);
  const listFragment = document.createDocumentFragment();
  for (const sortedElem of sortedElements) {
    const pictureElement = createPictureElement(sortedElem);
    listFragment.appendChild(pictureElement);
  }
  return container.appendChild(listFragment);
};


export {defaultBtn, defaultFilt, randomBtn, randomFilt, discussedBtn, discussedFilt, disableAllBtns};
