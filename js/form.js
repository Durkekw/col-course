

const fileField = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const cancelBtn = document.querySelector('#upload-cancel');
const formOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const hashtagField = document.querySelector('.text__hashtags');
const formComm = document.querySelector('.img-upload__text');
const test = document.querySelector('#upload-submit');
const hashes = formComm.querySelector('input');
const commentField = document.querySelector('.text__description');


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

cancelBtn.addEventListener('click', () => {
  hideModal();
});
fileField.addEventListener('change', () => {
  showModal();
});
// hashes.removeEventListener('keydown', onEscKey);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateTags = (value) =>{
  value = value.toLowerCase();
  const values = value.split(' ');
  const check = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const duplicates = values.filter((e, i, a) => a.indexOf(e) !== i);
  let isValidate = true;
  for(const valid of values){
    if(valid.indexOf('#') === 0 && check.test(valid) && values.length <= 5 && duplicates.length === 0){
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


const showForm = () => {

  form.addEventListener('click', () =>{
    pristine.validate();
  });

  test.addEventListener('click', (evt) =>{
    pristine.validate();
    evt.preventDefault();
  });
};

export{showForm};
