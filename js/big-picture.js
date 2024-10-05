const bigPicture = document.querySelector('.big-picture');
const delBtn=bigPicture.querySelector('#picture-cancel')

const showBigPicture = (data) => {
    bigPicture.classList.remove('hidden')
    document.querySelector('body').classList.add('modal-open')
    document.querySelector('.social__comment-count', '.comments-loader').classList.add('hidden')
    renderPictureDetails(data);
    renderComments(data.comments);
    onCancelButtonClick(delBtn); 
    onEscKeyDown(document)
}

const renderPictureDetails = (data) => {
    bigPicture.querySelector('.big-picture__img').src = data.url;
    bigPicture.querySelector('.social__comment-total-count').textContent = data.comments.length;
    bigPicture.querySelector('.likes-count').textContent = data.likes;
    bigPicture.querySelector('.social__caption').textContent = data.descriptions;
};

const hideBigPicture = () => {
    bigPicture.classList.add('hidden')
    document.querySelector('body').classList.remove('modal-open')
};

function onEscKeyDown(obj) {
    obj.addEventListener('keydown', (evt) => {
        if (evt.key === "Escape") hideBigPicture();
    });

}

const onCancelButtonClick = (btn) => {
    btn.addEventListener('click', () => {
            hideBigPicture();
        });
};

const renderComments = (dataCom) =>{
    const comment = document.createElement('li');
    comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35" />...';
    comment.classList.add('social__comment');
    comment.querySelector('.social__picture').src = dataCom.avatar;
}

export {showBigPicture}