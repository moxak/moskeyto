console.log("background script is running.");

async function fetchBookmarks() {
  console.log("fetching bookmarks...");
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      //   traverseBookmarks(bookmarkTreeNodes);
      resolve(bookmarkTreeNodes);
    });
  });
}

function traverseBookmarks(bookmarkTreeNodes) {
  for (let node of bookmarkTreeNodes) {
    if (node.url) {
      console.log(`Title: ${node.title}, URL: ${node.url}`);
    }
    if (node.children) {
      traverseBookmarks(node.children);
    }
  }
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'fetchBookmarks') {
    const bookmarkTreeNodes = await fetchBookmarks();
    // sendResponse(bookmarkTreeNodes);
    console.log(bookmarkTreeNodes);
    sendResponse([1, 2, 3]);
  }
  return true;
});
