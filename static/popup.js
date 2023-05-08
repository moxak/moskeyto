// Description: This file is the entry point for the popup window.
document.getElementById('myButton').addEventListener('click', () => {
  console.log('Button clicked!');
  chrome.runtime.sendMessage({ action: 'fetchBookmarks' });
});
