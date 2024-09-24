import {getRandomPositiveInteger, findRepeat} from "./util.js";

let id=0;
let url=0;
let allDesc = [];
let commentsArray = [];


const descriptions=['junior', 'middle', 'senior', 'teamlead'];
const commentMesseges = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
    'Dmitry',
    'Basily',
    'Egor',
    'Vlad',
    'Anna',
];

function createPicture(){
    let photoMas = {};
    id+=1;
    url+=1;
    for (let i=0; i<getRandomPositiveInteger(0,25);i++){
        comments();
    }
    photoMas['id'] = id;
    photoMas['url'] = `photos/${url}.jpg`;
    photoMas['descriptions']=descriptions[getRandomPositiveInteger(0,descriptions.length-1)];
    photoMas['likes']=getRandomPositiveInteger(15,200);
    photoMas['comments']=commentsArray;
    commentsArray=[]
    allDesc.push(photoMas);
}

function comments(){
    let user = {}
    let avatarId=getRandomPositiveInteger(1,6);
    let commId=getRandomPositiveInteger(1,999);
    commId = findRepeat([], commId, 1, 999);
    user['id']=commId;
    user['avatar']=`img/avatar-${avatarId}.svg`;
    user['massage'] = commentMesseges[getRandomPositiveInteger(0, commentMesseges.length-1)];
    user['name']=names[getRandomPositiveInteger(0, names.length-1)];
    commentsArray.push(user);
}

function photoDescription(){
    for(let j=0; j<25; j++){
        createPicture();
    }
    return allDesc;
}

export {photoDescription}