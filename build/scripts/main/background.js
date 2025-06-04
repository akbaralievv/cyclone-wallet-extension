import { wif, sign_message, verify_message } from '../components/libs/sign-libs.js';
import { extractValues } from '../components/helpers/index.js';
import { Bitcoin } from '../components/libs/bitcoin-lib.js';
import { sha256 } from '../components/libs/sha256.js';

export const actionsMap = {
  ready: 'ready',
  getWalletAddress: 'getWalletAddress',
  getNativeBalance: 'getNativeBalance',
  signAndSend: 'signAndSend',
  sign: 'sign',
};

const DEFAULT_GATEWAY_URL = 'http://164.68.127.226:9231';
const GW_LS_KEY = 'gw';

const getGatewayUrl = (path) => {
  return new Promise((resolve) => {
    chrome.storage.local.get([GW_LS_KEY], (result) => {
      let gw = result[GW_LS_KEY] || DEFAULT_GATEWAY_URL;

      // Удаляем завершающий слэш
      gw = gw.replace(/\/+$/, '');

      // Добавляем путь
      const fullPath = path.startsWith('/') ? path : `/${path}`;
      resolve(`${gw}${fullPath}`);
    });
  });
};

let isAuth = null;
let windowId = null;

chrome.storage.local.get('password', (result) => {
  isAuth = result.password;
});
chrome.storage.local.get('windowId', (result) => {
  windowId = result.windowId;
});

let nativeBalance = 0;
let isPopupOpen = false;
let activeAccount = null;
let activeAddress = null;
chrome.storage.local.get('activeAddress', (result) => {
  activeAddress = result.activeAddress;
});
chrome.storage.local.get('nativeBalance', (result) => {
  nativeBalance = result.nativeBalance;
});
chrome.storage.local.get('activeAccount', (result) => {
  activeAccount = result.activeAccount;
});
chrome.storage.local.get('isPopupOpen', (result) => {
  isPopupOpen = result.isPopupOpen;
});

chrome.runtime.onInstalled.addListener((details) => chrome.storage.local.remove('whitelist'));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    const currentDomain = new URL(sender.url).origin;
    chrome.storage.local.get('whitelist', async (result) => {
      const whitelist = result.whitelist || {};
      const accountWhitelist = whitelist[activeAddress] || [];

      switch (request.action) {
        case actionsMap.getWalletAddress:
        case actionsMap.getNativeBalance:
        case actionsMap.sign:
        case actionsMap.signAndSend:
          await isValidTransactionsApi(currentDomain, accountWhitelist, request, sendResponse);
          break;
        case 'VAULT_PASSWORD_CHANGE':
          isAuth = request.password;
          nativeBalance = request.nativeBalance;
          activeAccount = request.activeAccount;
          activeAddress = request.activeAddress;
          sendResponse({ status: 'Password changed' });
          break;
        default:
          sendResponse({ status: 'Unknown action' });
      }
    });
  } catch (error) {
    sendResponse({ status: 'error', message: error.message });
  }
  return true;
});

function signSignature(activeAccount, signPayload) {
  const pk = new Bitcoin.ECKey(Array.from(wif.decode(activeAccount.pk).privateKey));
  const signature = sign_message(pk, signPayload, false);
  const verifySignature = verify_message(signature, signPayload);
  return { signature, verifySignature };
}

function generateMessage(token, address, amount, message) {
  if (message || (!message && !token && !address && !amount)) {
    try {
      const parsedData = JSON.parse(message);
      if (parsedData.method === 'execute') {
        return message;
      }
    } catch (error) {
      if (message.includes('transfer') || message.includes('callContract')) {
        const validStr = JSON.stringify({
          method: 'execute',
          data: message,
        });
        return validStr;
      }
      return message;
    }
  }

  if (token === 'native') {
    return JSON.stringify({
      method: 'execute',
      data: `transfer("${address}", ${amount * 100})`,
    });
  }

  return JSON.stringify({
    method: 'execute',
    data: `callContract("${token}", "transfer", "${address}", ${amount})`,
  });
}

async function sign(payload) {
  const keysToCheck = ['address', 'amount'];
  let message;

  if (keysToCheck.every((key) => key in payload)) {
    message = generateMessage(
      payload.token || null,
      payload.address,
      payload.amount,
      payload.message
    );
  } else {
    message = generateMessage(null, null, null, payload.message);
  }

  const sendRequest = {
    vm: '',
    hash: '',
    signature: '',
    message,
    currencyFee:
      payload.currencyFee === 'native' || !payload.currencyFee ? '' : payload.currencyFee,
    sender: activeAddress,
    nonce: Date.now().toString(),
  };

  const signPayload = `${sendRequest.vm}${sendRequest.sender}${sendRequest.message}${sendRequest.nonce}${sendRequest.currencyFee}`;
  const { signature, verifySignature } = signSignature(activeAccount, signPayload);

  if (!verifySignature) return Promise.reject();

  sendRequest.signature = signature;
  sendRequest.hash = await sha256(
    `${sendRequest.vm}${sendRequest.signature}${sendRequest.sender}${sendRequest.message}${sendRequest.nonce}${sendRequest.currencyFee}`
  );

  return sendRequest;
}

async function send(payload) {
  try {
    const api_send = await getGatewayUrl('/api/gw/v1/transaction/send');
    const response = await fetch(api_send, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return await response.json();
  } catch (error) {
    return error;
  }
}

async function signAndSend(payload) {
  try {
    const sendRequest = await sign(payload);
    return await send(sendRequest);
  } catch (error) {
    return error;
  }
}

function checkWhitelist(currentDomain, whitelist) {
  return whitelist.some((entry) => entry.url === currentDomain && entry.state === true);
}

async function isValidTransactionsApi(currentDomain, whitelist, request, sendResponse) {
  if (isAuth) {
    if (checkWhitelist(currentDomain, whitelist)) {
      await handleTransactionsRequest(request, sendResponse);
    } else {
      confirmWhitelistPopup(currentDomain, request, sendResponse, whitelist);
    }
  } else {
    if (!isPopupOpen) {
      chrome.system.display.getInfo((displays) => {
        const display = displays[0];
        const { width: screenWidth, height: screenHeight } = display.workArea;
        const windowWidth = 360;
        const windowHeight = 650;
        const left = screenWidth - windowWidth;
        const top = 70;

        chrome.windows.create(
          {
            url: chrome.runtime.getURL('index.html?popup=true'),
            type: 'popup',
            focused: true,
            width: windowWidth,
            height: windowHeight,
            left,
            top,
          },
          (window) => {
            isPopupOpen = true;
            windowId = window.id;
            chrome.storage.local.set({ isPopupOpen: true, windowId: window.id });
            sendResponse({ status: 'Popup opened', windowId: window.id });

            chrome.windows.onRemoved.addListener(function windowRemovedListener(windowId) {
              if (windowId === window.id) {
                isPopupOpen = false;
                chrome.storage.local.set({ isPopupOpen: false });
                windowId = null;
                chrome.windows.onRemoved.removeListener(windowRemovedListener);
              }
            });
          }
        );
      });
    } else {
      chrome.windows.remove(windowId, () => {
        chrome.system.display.getInfo((displays) => {
          const display = displays[0];
          const { width: screenWidth, height: screenHeight } = display.workArea;
          const windowWidth = 360;
          const windowHeight = 650;
          const left = screenWidth - windowWidth;
          const top = 70;

          chrome.windows.create(
            {
              url: chrome.runtime.getURL('index.html?popup=true'),
              type: 'popup',
              focused: true,
              width: windowWidth,
              height: windowHeight,
              left,
              top,
            },
            (window) => {
              windowId = window.id;
              isPopupOpen = true;
              chrome.storage.local.set({ isPopupOpen: true, windowId: window.id });
              sendResponse({ status: 'Popup opened', windowId: window.id });

              chrome.windows.onRemoved.addListener(function windowRemovedListener(windowsId) {
                if (windowsId === window.id) {
                  isPopupOpen = false;
                  windowId = null;
                  chrome.storage.local.set({ isPopupOpen: false, windowId: null });
                  chrome.windows.onRemoved.removeListener(windowRemovedListener);
                }
              });
            }
          );
        });
      });
    }
  }
}

function confirmWhitelistPopup(currentDomain, request, sendResponse, whitelist) {
  if (!isPopupOpen) {
    chrome.system.display.getInfo((displays) => {
      const display = displays[0];
      const { width: screenWidth, height: screenHeight } = display.workArea;
      const windowWidth = 360;
      const windowHeight = 650;
      const left = screenWidth - windowWidth;
      const top = 70;

      chrome.windows.create(
        {
          url: chrome.runtime.getURL('index.html?popup=true'),
          type: 'popup',
          focused: true,
          width: windowWidth,
          height: windowHeight,
          left,
          top,
        },
        (window) => {
          windowId = window.id;
          isPopupOpen = true;
          chrome.storage.local.set({ isPopupOpen: true, windowId: window.id });
          try {
            setTimeout(() => {
              chrome.runtime.sendMessage({ action: request.action, currentDomain });
            }, 500);
          } catch (error) {
            console.log(error);
          }
          const confirmListener = (confirmRequest, confirmSender, confirmSendResponse) => {
            if (confirmRequest.action === 'CONFIRM_PERMISSION') {
              if (confirmRequest.confirmed) {
                chrome.storage.local.get('whitelist', (result) => {
                  let whitelist = result.whitelist || {};

                  if (!whitelist[activeAddress]) {
                    whitelist[activeAddress] = [];
                  }
                  const accountWhitelist = whitelist[activeAddress] || [];
                  const existingEntry = accountWhitelist.find((item) => item.url === currentDomain);
                  if (existingEntry) {
                    existingEntry.state = true;
                  } else {
                    accountWhitelist.push({ url: currentDomain, state: true });
                  }
                  chrome.storage.local.set({ whitelist }, () => {
                    handleTransactionsRequest(request, sendResponse);
                  });
                });
              }
              chrome.windows.remove(window.id, () => {
                isPopupOpen = false;
                windowId = null;
                chrome.storage.local.set({ isPopupOpen: false, windowId: null });
              });
            } else if (confirmRequest.action === 'CONFIRM_ONE_TIME_PERMISSION') {
              chrome.storage.local.get('whitelist', (result) => {
                let whitelist = result.whitelist || {};

                if (!whitelist[activeAddress]) {
                  whitelist[activeAddress] = [];
                }
                const accountWhitelist = whitelist[activeAddress] || [];
                const existingEntry = accountWhitelist.find((item) => item.url === currentDomain);

                if (existingEntry) {
                  existingEntry.state = false;
                } else {
                  accountWhitelist.push({ url: currentDomain, state: false });
                }

                whitelist[activeAddress] = accountWhitelist;
                chrome.storage.local.set({ whitelist }, () => {
                  handleTransactionsRequest(request, sendResponse);
                });
              });
              chrome.windows.remove(window.id, () => {
                isPopupOpen = false;
                windowId = null;
                chrome.storage.local.set({ isPopupOpen: false, windowId: null });
              });
            }
          };

          chrome.windows.onRemoved.addListener((windowsId) => {
            if (windowsId === window.id) {
              isPopupOpen = false;
              windowId = null;
              chrome.storage.local.set({ isPopupOpen: false, windowId: null });
              chrome.runtime.onMessage.removeListener(confirmListener);
            }
          });

          chrome.runtime.onMessage.addListener(confirmListener);
        }
      );
    });
  } else {
    chrome.windows.remove(windowId, () => {
      chrome.system.display.getInfo((displays) => {
        const display = displays[0];
        const { width: screenWidth, height: screenHeight } = display.workArea;
        const windowWidth = 360;
        const windowHeight = 650;
        const left = screenWidth - windowWidth;
        const top = 70;

        chrome.windows.create(
          {
            url: chrome.runtime.getURL('index.html?popup=true'),
            type: 'popup',
            focused: true,
            width: windowWidth,
            height: windowHeight,
            left,
            top,
          },
          (window) => {
            windowId = window.id;
            isPopupOpen = true;
            chrome.storage.local.set({ isPopupOpen: true, windowId: window.id });
            try {
              setTimeout(() => {
                chrome.runtime.sendMessage({ action: request.action, currentDomain });
              }, 500);
            } catch (error) {
              console.log(error);
            }
            const confirmListener = (confirmRequest, confirmSender, confirmSendResponse) => {
              if (confirmRequest.action === 'CONFIRM_PERMISSION') {
                if (confirmRequest.confirmed) {
                  chrome.storage.local.get('whitelist', (result) => {
                    let whitelist = result.whitelist || {};

                    if (!whitelist[activeAddress]) {
                      whitelist[activeAddress] = [];
                    }
                    const accountWhitelist = whitelist[activeAddress] || [];
                    const existingEntry = accountWhitelist.find(
                      (item) => item.url === currentDomain
                    );
                    if (existingEntry) {
                      existingEntry.state = true;
                    } else {
                      accountWhitelist.push({ url: currentDomain, state: true });
                    }
                    chrome.storage.local.set({ whitelist }, () => {
                      handleTransactionsRequest(request, sendResponse);
                    });
                  });
                }
                chrome.windows.remove(window.id, () => {
                  isPopupOpen = false;
                  windowId = null;
                  chrome.storage.local.set({ isPopupOpen: false, windowId: null });
                });
              } else if (confirmRequest.action === 'CONFIRM_ONE_TIME_PERMISSION') {
                chrome.storage.local.get('whitelist', (result) => {
                  let whitelist = result.whitelist || {};

                  if (!whitelist[activeAddress]) {
                    whitelist[activeAddress] = [];
                  }
                  const accountWhitelist = whitelist[activeAddress] || [];
                  const existingEntry = accountWhitelist.find((item) => item.url === currentDomain);

                  if (existingEntry) {
                    existingEntry.state = false;
                  } else {
                    accountWhitelist.push({ url: currentDomain, state: false });
                  }

                  whitelist[activeAddress] = accountWhitelist;
                  chrome.storage.local.set({ whitelist }, () => {
                    handleTransactionsRequest(request, sendResponse);
                  });
                });
                chrome.windows.remove(window.id, () => {
                  isPopupOpen = false;
                  windowId = null;
                  chrome.storage.local.set({ isPopupOpen: false, windowId: null });
                });
              }
            };

            chrome.windows.onRemoved.addListener((windowsId) => {
              if (windowsId === window.id) {
                isPopupOpen = false;
                windowId = null;
                chrome.storage.local.set({ isPopupOpen: false, windowId: null });
                chrome.runtime.onMessage.removeListener(confirmListener);
              }
            });

            chrome.runtime.onMessage.addListener(confirmListener);
          }
        );
      });
    });
  }
}

function validatePayload(input, type) {
  if (typeof input !== 'object' || input === null) {
    return { isValid: false, message: 'Payload is not an object or is null' };
  }

  const requiredKeysMap = {
    signAndSend: ['currencyFee', 'message'],
    sign: ['message'],
  };

  const requiredKeys = requiredKeysMap[type] || [];

  for (const key of requiredKeys) {
    if (!Object.prototype.hasOwnProperty.call(input, key)) {
      return { isValid: false, message: `Payload does not contain "${key}" key` };
    }
    if (typeof input[key] !== 'string') {
      return { isValid: false, message: `${key} is not a string` };
    }
  }

  return { isValid: true, message: 'Payload is valid' };
}

async function handleTransactionsRequest(request, sendResponse) {
  try {
    switch (request.action) {
      case actionsMap.getWalletAddress:
        chrome.storage.local.get('activeAddress', (items) => {
          sendResponse({ walletAddress: items.activeAddress });
        });
        break;
      case actionsMap.getNativeBalance:
        sendResponse({ nativeBalance });
        break;
      case actionsMap.sign:
        if (activeAccount && request.data) {
          const validationResult = validatePayload(request.data, 'sign');
          if (validationResult.isValid) {
            const { signature } = signSignature(activeAccount, request.data.message);
            sendResponse({ signature, sender: activeAddress, message: request.data.message });
          } else {
            sendResponse(validationResult);
          }
        } else {
          sendResponse({ message: 'No active account or message text' });
        }
        break;
      case actionsMap.signAndSend:
        const signAndSendValidationResult = validatePayload(request.data, 'signAndSend');
        if (!signAndSendValidationResult.isValid) {
          sendResponse(signAndSendValidationResult);
          break;
        }

        const extractedPayload = await extractValues(request.data.message);
        if (
          extractedPayload &&
          extractedPayload.amount &&
          +extractedPayload.amount / 100 > nativeBalance
        ) {
          sendResponse({ isValid: false, message: "You don't have enough tokens" });
          break;
        }

        const responseSignAndSend = await signAndSend({
          ...extractedPayload,
          message: request.data.message,
          currencyFee: request.data.currencyFee,
        });

        sendResponse(responseSignAndSend);
        break;
      default:
        sendResponse({ message: 'Unknown action' });
    }
  } catch (error) {
    sendResponse({ status: 'error', message: error.message });
  }
}
