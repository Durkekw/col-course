import { renderPictures } from './picture.js';
import { resetScale } from './scale.js';
import {} from './effects.js';
import {getData, sendData} from './api';
import {setOnFormSubmit, onSendDataSucess, onSendDataError} from './form';
import {defaultBtn, defaultFilt, randomFilt, randomBtn, discussedFilt, discussedBtn} from './filter';


const onLoadSuccess = (data) =>{
  renderPictures(data);
  defaultBtn.addEventListener('click', () =>{
    defaultFilt(data);
  });
  randomBtn.addEventListener('click', () =>{
    randomFilt(data);
  });
  discussedBtn.addEventListener('click', () =>{
    discussedFilt(data);
  });
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

