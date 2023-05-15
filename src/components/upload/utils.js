export const getDefaultValue = (fileList = []) => {
  const newFileList = [...fileList];
  newFileList.forEach((item) => {
    if (!item.name) {
      const nameArr = item.url.split('/');
      const name = nameArr[nameArr.length - 1];
      item.name = name;
    }
  });
  return newFileList;
};
