const img = document.querySelector('.img-upload__preview img');
const scaleInput = document.querySelector('.scale__control--value');
const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');

const DEFAILT_SCALE = 100;
const SCALE_STEP = 25;
const MIN_SCALE = 25;


const scaleImg = (value = DEFAILT_SCALE) =>{
  img.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onSmallerBtnClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if(newValue < MIN_SCALE){
    newValue = MIN_SCALE;
  }
  scaleImg(newValue);
};

const onBiggerBtnClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if(newValue > DEFAILT_SCALE){
    newValue = DEFAILT_SCALE;
  }
  scaleImg(newValue);
};

smallerBtn.addEventListener('click', onSmallerBtnClick);
biggerBtn.addEventListener('click', onBiggerBtnClick);

const resetScale = () => {
  scaleImg(DEFAILT_SCALE);
};

export {resetScale};
