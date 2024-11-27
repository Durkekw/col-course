import { renderPictures } from './picture.js';
import { resetScale } from './scale.js';
import {} from './effects.js';
import {getData, sendData, debounce} from './api';
import {setOnFormSubmit, onSendDataSucess, onSendDataError} from './form';
import {defaultBtn, defaultFilt, randomFilt, randomBtn, discussedFilt, discussedBtn, disableAllBtns} from './filter';


const onLoadSuccess = (data) =>{
  renderPictures(data);
  const debDef = debounce(() => {
    defaultFilt(data);
    disableAllBtns(false);
  }, 500);
  const debRand = debounce(() => {
    randomFilt(data);
    disableAllBtns(false);
  }, 500);
  const debDisc = debounce(() => {
    discussedFilt(data);
    disableAllBtns(false);
  },500);
  defaultBtn.addEventListener('click', debDef);
  randomBtn.addEventListener('click', debRand);
  discussedBtn.addEventListener('click', debDisc);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const onLoadFailure = (error) =>{
  throw new Error(error.message);
};

getData(onLoadSuccess, onLoadFailure);
setOnFormSubmit(async (data) => {
  await sendData(onSendDataSucess,onSendDataError,data);
});
resetScale();

