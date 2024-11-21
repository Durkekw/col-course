import { renderPictures } from './picture.js';
import { resetScale } from './scale.js';
import {} from './effects.js';
import {getData, sendData} from './api';
import {setOnFormSubmit, onSendDataSucess, onSendDataError} from './form';

const onLoadSuccess = (data) =>{
  renderPictures(data);
};

const onLoadFailure = (error) =>{
  throw new Error(error.message);
};

getData(onLoadSuccess, onLoadFailure);
setOnFormSubmit(async (data) => {
  await sendData(onSendDataSucess,onSendDataError,data);
});
resetScale();

