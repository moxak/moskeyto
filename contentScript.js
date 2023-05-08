const MODE = 'dev';
// const MODE = 'release';

if (MODE) {
  console.log('Content script running on this page!');
};

if (MODE) {
  document.addEventListener('keydown', (event) => {
    console.log(`Key "${event.key}" was pressed.`);
  });
};

