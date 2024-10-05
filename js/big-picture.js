const bigPicture = document.querySelector('.big-picture');
const delBtn = bigPicture.querySelector('#picture-cancel');
const comments = document.querySelector('.social__comments');

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
  for (const dataCom of dataComs) {
    const commentElement = createComments(dataCom);
    comments.appendChild(commentElement);
  }
};


const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  renderPictureDetails(data);
  renderComments(data.comments);
  onCancelButtonClick(delBtn);
  onEscKeyDown(document);
};

export {showBigPicture};
