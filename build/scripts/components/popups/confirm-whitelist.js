document.getElementById('confirm').addEventListener('click', () => {
  chrome.runtime.sendMessage({
    action: 'CONFIRM_PERMISSION',
    confirmed: true,
    windowId: chrome.windows.WINDOW_ID_CURRENT,
  });
});

document.getElementById('cancel').addEventListener('click', () => {
  chrome.runtime.sendMessage({
    action: 'CONFIRM_PERMISSION',
    confirmed: false,
    windowId: chrome.windows.WINDOW_ID_CURRENT,
  });
});

document.getElementById('confirm_one_time').addEventListener('click', () => {
  chrome.runtime.sendMessage({
    action: 'CONFIRM_ONE_TIME_PERMISSION',
    confirmed: false,
    windowId: chrome.windows.WINDOW_ID_CURRENT,
  });
});
