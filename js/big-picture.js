const bigPicture = document.querySelector('.big-picture');
const delBtn = bigPicture.querySelector('#picture-cancel');
const comments = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const commentsCounter = document.querySelector('.social__comment-shown-count');
const COMMENTS_PER_PORTION = 5;

let commentsShown = 0;
let commentsArr = [];

const renderPictureDetails = (data) => {
  const bigImg = bigPicture.querySelector('.big-picture__img');
  bigImg.querySelector('img').src = data.url;
  bigPicture.querySelector('.social__comment-total-count').textContent = data.comments.length;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.social__caption').textContent = data.descriptions;
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  comments.innerHTML = '';
  document.removeEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      hideBigPicture();
    }
  });
};

function onEscKeyDown(obj) {
  obj.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      hideBigPicture();
    }
  });
}

const onCancelButtonClick = (btn) => {
  btn.addEventListener('click', () => {
    hideBigPicture();
  });
};

const createComments = (dataCom) =>{
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"></img>';
  comment.classList.add('social__comment');
  comment.querySelector('.social__picture').alt = dataCom.name;
  comment.querySelector('.social__picture').src = dataCom.avatar;
  comment.innerHTML += '<p class="social__text"></p>';
  comment.querySelector('.social__text').textContent = dataCom.massage;
  return comment;
};

const renderComments = (dataComs) =>{
  commentsShown += COMMENTS_PER_PORTION;
  if(commentsShown >= dataComs.length){
    commentsLoader.classList.add('hidden');
    commentsShown = dataComs.length;
    commentsCounter.textContent = commentsShown;
  }else{
    commentsLoader.classList.remove('hidden');
    commentsCounter.textContent = commentsShown;
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComments(dataComs[i]);
    fragment.append(commentElement);
  }
  comments.innerHTML = '';
  comments.append(fragment);
};


const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  renderPictureDetails(data);
  commentsArr = data.comments;
  commentsShown = 0;
  renderComments(commentsArr);
  onCancelButtonClick(delBtn);
  onEscKeyDown(document);
};

commentsLoader.addEventListener('click', () => {
  renderComments(commentsArr);
});

export {showBigPicture};
