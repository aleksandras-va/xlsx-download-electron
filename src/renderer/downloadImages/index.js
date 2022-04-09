import { logInfo } from '../logInfo';
import { handleDestination } from './handleDestination';
import { setDestinationMessage } from './setDestinationMessage';

const fs = require('fs');
const excelToJson = require('convert-excel-to-json');
const request = require('request');

export const downloadImages = (path) => {
  const destination = handleDestination();

  const download = function (uri, filename, callback) {
    request.head({ url: uri, followAllRedirects: true }, function (error, response) {
      if (error) throw new Error(error);

      const content = response.headers['content-type'];
      const ext = content.split('/');
      filename = filename + '.' + ext[1];

      const stream = request({ url: uri, followAllRedirects: true }).pipe(
        fs.createWriteStream(filename)
      );
      stream.on('close', callback);
      stream.on('error', (_error) => {
        logInfo(_error.toString(), 'error');
      });
    });
  };

  function resolveSingleImage(imagesData, iterator) {
    const { url, filename } = imagesData[iterator];

    logInfo(`Attempting to download: "${filename}"`);

    download(url, `${destination}/${filename}`, () => {
      logInfo(`Successfully downloaded: "${filename}"`, 'success');
      iterator++;
      if (iterator >= imagesData.length) {
        logInfo(`Downloaded total of ${iterator} items`);
        logInfo('Done!', 'end');
        setDestinationMessage(destination);
      } else {
        resolveSingleImage(imagesData, iterator);
      }
    });
  }

  const resolveImages = (callback) => {
    try {
      const { Sheet1: data } = excelToJson({
        sourceFile: path,
        columnToKey: { A: 'filename', B: 'url' },
      });

      let iterator = 0;
      callback(data, iterator);
    } catch (error) {
      logInfo(error.toString(), 'error');
      process.exit(1);
    }
  };

  resolveImages(resolveSingleImage);
};
