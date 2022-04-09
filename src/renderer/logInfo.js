const date = require('date-and-time');

const loggerWindow = document.querySelector('.logger__window');

export const logInfo = (text, type) => {
  if (!loggerWindow) throw new Error('No logger window found.');

  const dateStamp = date.format(new Date(), 'HH:mm:ss');

  let ul = loggerWindow.querySelector('ul');

  if (!ul) {
    ul = document.createElement('ul');
    loggerWindow.appendChild(ul);
  }

  let emoji = 'ℹ️';

  if (type === 'success') emoji = '✅';
  if (type === 'error') emoji = '❌';
  if (type === 'end') emoji = '🎉';

  console.log(`Progress: ${text}`);

  const listItemElement = document.createElement('li');

  const logHtml = `<div class="log-text">${emoji} ${text}</div> <div class="timestamp">${dateStamp}</div>`;

  listItemElement.innerHTML = logHtml;

  ul.appendChild(listItemElement);

  listItemElement.scrollIntoView();
};
