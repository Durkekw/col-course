import { renderPictures } from './picture.js';
import { resetScale } from './scale.js';
import {} from './effects.js';
import {getData, sendData} from './api';
import {setOnFormSubmit, onSendDataSucess, onSendDataError} from './form';
import {defaultBtn, defaultFilt, randomFilt, randomBtn, discussedFilt, discussedBtn, disableAllBtns} from './filter';


const onLoadSuccess = (data) =>{
  renderPictures(data);
  defaultBtn.addEventListener('click', () =>{
    discussedBtn.classList.remove('img-filters__button--active');
    randomBtn.classList.remove('img-filters__button--active');
    defaultBtn.classList.add('img-filters__button--active');
    disableAllBtns(true);
    setTimeout(() =>{
      defaultFilt(data);
      disableAllBtns(false);
    },500);
  });

  randomBtn.addEventListener('click', () =>{
    defaultBtn.classList.remove('img-filters__button--active');
    discussedBtn.classList.remove('img-filters__button--active');
    randomBtn.classList.add('img-filters__button--active');
    disableAllBtns(true);
    setTimeout(() =>{
      randomFilt(data);
      disableAllBtns(false);
    },500);
  });
  discussedBtn.addEventListener('click', () =>{
    discussedBtn.classList.add('img-filters__button--active');
    defaultBtn.classList.remove('img-filters__button--active');
    randomBtn.classList.remove('img-filters__button--active');
    disableAllBtns(true);
    setTimeout(() =>{
      discussedFilt(data);
      disableAllBtns(false);
    },500);

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

