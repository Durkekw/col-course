
function getRandomPositiveInteger(a, b) {
    const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
}

function findRepeat(array, value, start, end){
    for(let r=0; r<10;){
        if(array.includes(value)){
            value=getRandomPositiveInteger(start,end);
        }else{
            array.push(value);
            return value;
        }
    }
}

export {getRandomPositiveInteger, findRepeat}