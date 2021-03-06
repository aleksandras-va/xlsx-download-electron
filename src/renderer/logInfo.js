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

  let emoji = 'âšī¸';

  if (type === 'success') emoji = 'â';
  if (type === 'error') emoji = 'â';
  if (type === 'end') emoji = 'đ';

  console.log(`Progress: ${text}`);

  const listItemElement = document.createElement('li');

  const logHtml = `<div class="log-text">${emoji} ${text}</div> <div class="timestamp">${dateStamp}</div>`;

  listItemElement.innerHTML = logHtml;

  ul.appendChild(listItemElement);

  listItemElement.scrollIntoView();
};
