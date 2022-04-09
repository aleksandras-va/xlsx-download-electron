const { dialog } = require('@electron/remote');

import { downloadImages } from './downloadImages';

const button = document.getElementById('select-file');
const errorElement = document.getElementById('error');

const selectFile = async () => {
  const { filePaths } = await dialog.showOpenDialog({
    filters: [{ name: 'Files', extensions: ['xlsx'] }],
  });

  return filePaths[0];
};

button.addEventListener('click', async () => {
  let src;
  try {
    src = await selectFile();
    if (src) {
      downloadImages(src);
    }
  } catch (error) {
    console.error(error);
    errorElement.innerHTML = `src="${src}"\n\n${error}`;
  }
});
