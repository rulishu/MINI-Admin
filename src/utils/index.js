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

export const convertTreeList = (data, fieldNames = { label: 'areaName', value: 'areaCode' }) => {
  return data.map((item) => {
    const newChildren = item.children ? convertTreeList(item.children) : [];
    return {
      ...item,
      label: item[fieldNames['label']],
      value: item[fieldNames['value']],
      children: newChildren,
    };
  });
};
