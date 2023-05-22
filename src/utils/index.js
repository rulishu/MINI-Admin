export const getUrl = (list = []) => {
  const result = list.map((item) => item.url);
  return result.join(',');
};

export const getUrlToList = (urlList = '') => {
  let result = [];
  if (urlList) {
    const list = urlList.split(',');
    result = list.map((item) => ({ url: item }));
  }
  return result;
};
