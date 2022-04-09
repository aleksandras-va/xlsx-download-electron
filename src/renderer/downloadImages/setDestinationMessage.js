export const setDestinationMessage = (destination) => {
  const destinationSection = document.querySelector('.destination');

  destinationSection?.classList.remove('hidden');

  const codeElement = destinationSection?.querySelector('code');

  codeElement.innerText = `'${destination}'`;
};
