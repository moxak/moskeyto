const MODE = 'dev';
// const MODE = 'release';

let isModalVisible = false;

if (MODE) {
  console.log('Content script running on this page!');
};

if (MODE) {
  document.addEventListener('keydown', (event) => {
    console.log(`Key "${event.key}" was pressed.`);
  });
};

async function toggleModal() {
  if (isModalVisible) {
    closeModal();
  } else {
    await showModal();
  }
}

async function showModal() {
  // if (isModalVisible) return;
  isModalVisible = true;

  const modalBackdrop = document.createElement('div');
  modalBackdrop.id = 'modal-backdrop';
  modalBackdrop.style.position = 'fixed';
  modalBackdrop.style.top = '0';
  modalBackdrop.style.left = '0';
  modalBackdrop.style.width = '100%';
  modalBackdrop.style.height = '100%';
  modalBackdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  modalBackdrop.style.zIndex = '1000';

  // モーダル本体を作成
  const modalContent = document.createElement('div');
  modalContent.id = 'modal-content';
  modalContent.style.position = 'fixed';
  modalContent.style.top = '50%';
  modalContent.style.left = '50%';
  modalContent.style.transform = 'translate(-50%, -50%)';
  modalContent.style.backgroundColor = 'white';
  modalContent.style.padding = '20px';
  modalContent.style.borderRadius = '4px';
  modalContent.style.zIndex = '1001';
  modalContent.innerHTML = '<h2>Moskeyto</h2><p>This is a simple modal.</p>';

  // モーダルのクローズボタンを作成
  const closeButton = document.createElement('button');
  closeButton.innerText = 'Close';
  closeButton.style.display = 'block';
  closeButton.style.margin = 'auto';
  closeButton.style.marginTop = '10px';

  closeButton.onclick = () => {
    document.body.removeChild(modalBackdrop);
    document.body.removeChild(modalContent);
    isModalVisible = false;
  };

  // ブックマーク一覧を表示するためのコンテナを作成
  const bookmarksContainer = document.createElement('ul');
  bookmarksContainer.id = 'bookmarks-container';
  modalContent.appendChild(bookmarksContainer);
  
  // ブックマーク一覧を取得し、renderBookmarks() 関数でモーダルに表示
  const bookmarkTreeNodes = await new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: 'fetchBookmarks' }, (response) => {
      resolve(response);
    });
  });
  console.log(bookmarkTreeNodes);
  renderBookmarks(bookmarkTreeNodes, bookmarksContainer);

  // モーダルにクローズボタンを追加
  modalContent.appendChild(closeButton);

  // モーダルと背景をページに追加
  document.body.appendChild(modalBackdrop);
  document.body.appendChild(modalContent);
}

function closeModal() {
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalContent = document.getElementById('modal-content');

  if (modalBackdrop && modalContent) {
    document.body.removeChild(modalBackdrop);
    document.body.removeChild(modalContent);
    isModalVisible = false;
  }
}

function renderBookmarks(bookmarkTreeNodes, container) {
  console.log(bookmarkTreeNodes);
  if (!bookmarkTreeNodes) return;
  for (let node of bookmarkTreeNodes) {
    if (node.url) {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = node.url;
      link.target = '_blank';
      link.textContent = node.title;
      listItem.appendChild(link);
      container.appendChild(listItem);
    }
    if (node.children) {
      renderBookmarks(node.children, container);
    }
  }
}

document.addEventListener('keydown', (event) => {
  console.log(`Key "${event.key}" was pressed.`);
  if (event.key === "b") {
    chrome.runtime.sendMessage({ action: 'fetchBookmarks' }); // get bookmarks
  }
});

// 以下、キー入力によるモーダルの表示・非表示
document.addEventListener('keydown', (event) => {
  if (event.key === 'm' || event.key === 'M') {
    toggleModal();
  }
});

