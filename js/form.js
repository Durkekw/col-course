const fileField = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const cancelBtn = document.querySelector('#upload-cancel');
const formOverlay = document.querySelector('.img-upload-overlay');
const body = document.querySelector('body');
const hashtagField = document.querySelector('text__hastags');
const formComm = document.querySelector('.text__description');


const hideModal = () => {
  formOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.removeEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      hideModal();
    }
  });
  form.reset();
};

const showModal = () =>{
  formOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  form.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      hideModal();
    }
  });
};

fileField.addEventListener('change', () => {
  showModal();
});

cancelBtn.addEventListener('click', () => {
  hideModal();
});

formComm.removeEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    hideModal();
  }
});

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateTags = (value) =>{
  value = value.toLowerCase();
  const values = value.slice();
  const check = /^\w+$/;
  const duplicates = values.filter((e, i, a) => a.indexOf(e) !== i);
  let isValidate = true;
  for(const valid of values){
    if(valid.indexOf('#') === 0 && check.test(valid) && valid.length >= 2 && valid.length <= 20 && values.length <= 5 && duplicates.length === 0){
      isValidate = true;
    }else{
      isValidate = false;
    }
  }
  return isValidate;
};

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хештеги'
);

