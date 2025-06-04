const actionsMap = {
  ready: 'ready',
  createWindow: 'createWindow',
  getWalletAddress: 'getWalletAddress',
  getNativeBalance: 'getNativeBalance',
  signAndSend: 'signAndSend',
  sign: 'sign',
};

const inject = function () {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('scripts/main/cyclone-wallet.js');
  script.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
};

inject();

window.addEventListener('message', async (e) => {
  if (e.source !== window || !e.data.action) return;

  if (e.data.action === actionsMap.getWalletAddress && !e.data.response) {
    try {
      const response = await chrome.runtime.sendMessage({ action: actionsMap.getWalletAddress });

      if (response && response.walletAddress) {
        window.postMessage(
          {
            action: actionsMap.getWalletAddress,
            walletAddress: response.walletAddress,
            response: true,
          },
          '*'
        );
      }
    } catch (error) {
      console.log('Error getting wallet address:', error);
    }
  }

  if (e.data.action === actionsMap.getNativeBalance && !e.data.response) {
    try {
      const response = await chrome.runtime.sendMessage({ action: actionsMap.getNativeBalance });

      if (response && response.nativeBalance) {
        window.postMessage(
          {
            action: actionsMap.getNativeBalance,
            nativeBalance: response.nativeBalance,
            response: true,
          },
          '*'
        );
      }
    } catch (error) {
      console.log('Error getting native balance:', error);
    }
  }

  if (e.data.action === actionsMap.sign && !e.data.response) {
    try {
      const response = await chrome.runtime.sendMessage({
        action: actionsMap.sign,
        data: e.data.data,
      });
      if (
        response &&
        typeof response === 'object' &&
        (response.signature || 'isValid' in response)
      ) {
        window.postMessage(
          {
            action: actionsMap.sign,
            data: response,
            response: true,
          },
          '*'
        );
      }
    } catch (error) {
      console.log('Error sign:', error);
    }
  }
  if (e.data.action === actionsMap.signAndSend && !e.data.response) {
    try {
      const response = await chrome.runtime.sendMessage({
        action: actionsMap.signAndSend,
        data: e.data.data,
      });

      if (
        response &&
        typeof response === 'object' &&
        ('isValid' in response || 'txHash' in response)
      ) {
        window.postMessage(
          {
            action: actionsMap.signAndSend,
            data: response,
            response: true,
          },
          '*'
        );
      }
    } catch (error) {
      console.log('Error signAndSend:', error);
    }
  }
});

window.postMessage({ action: actionsMap.ready }, '*');
