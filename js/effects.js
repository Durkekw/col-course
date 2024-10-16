import { cancelBtn } from './form.js';

const sliderElement = document.querySelector('.effect-level__slider');
const form = document.querySelector('.img-upload__form');
const img = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.effect-level__value');

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAILT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAILT_EFFECT;

const isDefault = () => chosenEffect === DEFAILT_EFFECT;

noUiSlider.create(sliderElement, {
  range:{
    min: DEFAILT_EFFECT.min,
    max: DEFAILT_EFFECT.max,
  },
  start: DEFAILT_EFFECT.max,
  step: DEFAILT_EFFECT.step,
  connect: 'lower',
});

sliderElement.classList.add('hidden');

const updateSlider = () =>{
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
  if(isDefault()){
    sliderElement.classList.add('hidden');
  }
};

const onFormChange = (evt) =>{
  if(!evt.target.classList.contains('effects__radio')){
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider();
};

form.addEventListener('change', onFormChange);

const onSliderUpdate = () => {
  img.style.filter = 'none';
  img.className = '';
  effectLevel.value = '';
  if(isDefault()){
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  img.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  img.classList.add(`effects__preview--${chosenEffect.name}`);
  effectLevel.value = sliderValue;
};

sliderElement.noUiSlider.on('update', onSliderUpdate);

cancelBtn.addEventListener('click', () => {
  sliderElement.classList.add('hidden');
  chosenEffect = DEFAILT_EFFECT;
  img.style.filter = '';
  img.className = '';
  effectLevel.value = '';
});

export{chosenEffect};
