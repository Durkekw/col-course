const getData = async (onSuccess, onFail) =>{
  try {
    const response = await fetch(
      'https://32.javascript.htmlacademy.pro/kekstagram/data');
    if(!response.ok){
      throw new Error('Не удалось загрузить фотографии');
    }
    const offers = await response.json();
    onSuccess(offers);
  } catch (error){
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://32.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body,
      });
    if(!response.ok){
      throw new Error('Не удалось загрузить фотографии');
    }
    onSuccess();
  } catch (error){
    onFail(error.message);
  }
};

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};


export {getData,sendData,debounce};


