import { logInfo } from '../logInfo';

const fs = require('fs');
const { app } = require('@electron/remote');
const date = require('date-and-time');

export const handleDestination = () => {
  const timestamp = date.format(new Date(), 'YYMMDD-HHmm');
  const directory = `${app.getPath('downloads')}/images-${timestamp}`;

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
    logInfo(`Created a destination folder`, 'success');
  } else {
    logInfo(`Destination folder already exists`);
  }

  return directory;
};
