import { showBigPicture } from "./big-picture";
const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content

const createPictureElement = (picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.addEventListener('click', () => {
        showBigPicture(picture);
    });
    return pictureElement;
}

const renderPictures = (pictures) => {
    const listFragment = document.createDocumentFragment();
    for (let picture of pictures) {
        const pictureElement = createPictureElement(picture);
        listFragment.appendChild(pictureElement)
    };
    return container.appendChild(listFragment);
};

export {renderPictures}