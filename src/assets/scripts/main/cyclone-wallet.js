const actionsMap = {
  getWalletAddress: 'getWalletAddress',
  getNativeBalance: 'getNativeBalance',
  signAndSend: 'signAndSend',
  sign: 'sign',
};

window.cycloneWallet = {
  getWalletAddress: () => {
    return new Promise((resolve) => {
      window.postMessage({ action: actionsMap.getWalletAddress }, '*');
      window.addEventListener('message', function listener(e) {
        if (
          e.data.action === actionsMap.getWalletAddress &&
          typeof e.data === 'object' &&
          'walletAddress' in e.data
        ) {
          window.removeEventListener('message', listener);
          resolve(e.data.walletAddress);
        }
      });
    });
  },
  getNativeBalance: () => {
    return new Promise((resolve) => {
      window.postMessage({ action: actionsMap.getNativeBalance }, '*');
      window.addEventListener('message', function listener(e) {
        if (
          e.data.action === actionsMap.getNativeBalance &&
          typeof e.data === 'object' &&
          'nativeBalance' in e.data
        ) {
          window.removeEventListener('message', listener);
          resolve(e.data.nativeBalance);
        }
      });
    });
  },
  sign: (params) => {
    return new Promise((resolve, reject) => {
      window.postMessage({ action: actionsMap.sign, data: params }, '*');
      window.addEventListener('message', function listener(e) {
        if (
          e.data.action === actionsMap.sign &&
          typeof e.data.data === 'object' &&
          e.data.data !== null &&
          ('signature' in e.data.data || 'isValid' in e.data.data)
        ) {
          window.removeEventListener('message', listener);
          resolve(e.data.data);
        } else if (e.data.action === actionsMap.sign && typeof e.data.data !== 'object') {
          window.removeEventListener('message', listener);
          resolve({ isValid: false, message: 'Payload is not an object or is null' });
        }
      });
    });
  },
  signAndSend: (params) => {
    return new Promise((resolve, reject) => {
      window.postMessage({ action: actionsMap.signAndSend, data: params }, '*');
      window.addEventListener('message', function listener(e) {
        if (
          e.data.action === actionsMap.signAndSend &&
          typeof e.data.data === 'object' &&
          e.data.data !== null &&
          ('txHash' in e.data.data || 'isValid' in e.data.data)
        ) {
          window.removeEventListener('message', listener);
          resolve(e.data.data);
        } else if (e.data.action === actionsMap.signAndSend && typeof e.data.data !== 'object') {
          window.removeEventListener('message', listener);
          resolve({ isValid: false, message: 'Payload is not an object or is null' });
        }
      });
    });
  },
};
