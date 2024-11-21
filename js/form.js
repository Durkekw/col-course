const fileField = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const cancelBtn = document.querySelector('#upload-cancel');
const formOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const hashtagField = document.querySelector('.text__hashtags');
const submBtn = document.querySelector('#upload-submit');
const commentField = document.querySelector('.text__description');
const mes = document.querySelectorAll('.mes');


const hideModal = () => {
  formOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKey);
  form.reset();
};

const showModal = () =>{
  formOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKey);
};

function onEscKey (evt) {
  if (evt.key === 'Escape' && !isFieldFocused()) {
    hideModal();
  }
}

function isFieldFocused(){
  return hashtagField === document.activeElement || commentField === document.activeElement;
}


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__field-wrapper--error'
});

cancelBtn.addEventListener('click', () => {
  hideModal();
  pristine.reset();
});
fileField.addEventListener('change', () => {
  showModal();
});

const validateTags = (value) =>{
  let counter = 0;
  value = value.toLowerCase();
  const values = value.split(' ');
  const check = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const duplicates = values.filter((e, i, a) => a.indexOf(e) !== i);
  for(const valid of values){
    if(valid.indexOf('#') === 0 && check.test(valid) && values.length <= 5 && duplicates.length === 0){
      ++counter;
    }
  }
  return counter === values.length;
};

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хештеги'
);

const createMessage = (message) => {
  const mesElem = document.querySelector(`#${message}`).cloneNode(true);
  const mesBtn = mesElem.querySelector(`.${message}__button`);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      mes.InnerHTML = '';
    }
  });
  document.addEventListener('click', () => {
    if(document.activeElement !== mes) {
      mes.InnerHTML = '';
    }
  });
  mesBtn.addEventListener('click', () => {
    mes.InnerHTML = '';
  });
  return mes.appendChild(mesElem);
};


const blockSubmitBtn = () => {
  submBtn.disabled = true;
  submBtn.textContent = 'Отправляю...';
};
const unblockSubmitBtn = () => {
  submBtn.disabled = false;
  submBtn.textContent = 'Опубликовать';
};

const onSendDataSucess = () =>{
  hideModal();
  createMessage('success');
};
const onSendDataError = () =>{
  createMessage('error');
  throw new Error('Возникла ошибка');
};

const setOnFormSubmit = (cb) =>{
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if(isValid){
      blockSubmitBtn();
      await cb(new FormData(form));
      unblockSubmitBtn();
    }
  });
};

export{setOnFormSubmit, cancelBtn, onSendDataSucess, onSendDataError};
