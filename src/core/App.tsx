import { FC, useEffect, useRef, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';

import { PagesStoreProvider } from 'pages';
import { Button, CopyToClipboard, Dialog, DialogContent, DialogHeading } from 'components';
import { truncateTextInMiddle } from 'utils/textFormat';
import { truncateAddress } from 'utils/address';

import { router } from './router';
import { useRootStore } from './RootStore';
import { IS_PLUGIN } from '../config';
import styles from './App.module.scss';

export const Pages = observer(() => {
  const rootStore = useRootStore();

  // TODO: HERE
  useEffect(() => {
    const listenMessagesDisposer = rootStore.web.listenMessages();

    const disposer = autorun(() => {
      if (!rootStore.vault.password || rootStore.wallet.accounts.length === 0) return;
      if (!rootStore.web.isReady) return;
      rootStore.web.sendActiveAddress();
      rootStore.web.sendNativeBalance();
    });

    return () => {
      listenMessagesDisposer();
      disposer();
    };
  }, []);

  useEffect(() => {
    const disposer = autorun(() => {
      if (rootStore.vault.password) {
        if (rootStore.wallet.accounts.length === 0) {
          const accounts = rootStore.vault.retrieveAccounts();
          rootStore.wallet.setAccounts(accounts);
        }

        rootStore.vault.syncAccounts();
      }
    });
    return () => {
      disposer();
    };
  }, []);

  return <RouterProvider router={router} />;
});

export const VaultWatcher = observer(() => {
  const rootStore = useRootStore();
  useEffect(() => {
    const disposer = autorun(() => {
      const password = rootStore.vault.password;
      const nativeBalance = rootStore.tokens.native;
      const activeAccount = rootStore
        ? rootStore.wallet.findAccountByAddress(rootStore.wallet.activeAddress)
        : null;

      try {
        chrome.storage.local.set({
          password: password ? true : false,
          activeAccount,
          nativeBalance,
        });
        chrome.runtime.sendMessage({
          action: 'VAULT_PASSWORD_CHANGE',
          password,
          nativeBalance,
          activeAccount,
          activeAddress: rootStore.wallet.activeAddress,
        });
      } catch (error) {
        console.log('Exception while sending message:', error);
      }
    });

    return () => {
      disposer();
    };
  }, [rootStore]);

  return null;
});

interface Account {
  name: string;
  address: string;
}
interface WhitelistEntry {
  url: string;
  state: boolean;
}

export const App: FC = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [checkedItems, setCheckedItems] = useState(true);
  const [currentURL, setCurrentURL] = useState<URL | string>('');
  const [activeAccount, setActiveAccount] = useState<Account | null>(null);
  const [actionText, setActionText] = useState('');
  const [isWhitelisted, setIsWhitelisted] = useState<WhitelistEntry | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const rootStore = useRootStore();

  const actionsMap = {
    ready: 'ready',
    getWalletAddress: 'getWalletAddress',
    getNativeBalance: 'getNativeBalance',
    signAndSend: 'signAndSend',
    sign: 'sign',
  };

  if (!IS_PLUGIN) {
    document.documentElement.style.setProperty('--plugin-width', '320px');
    document.documentElement.style.setProperty('--plugin-height', '400px');
  }

  const toggleCheckbox = () => {
    setCheckedItems(!checkedItems);
  };

  useEffect(() => {
    const handleMessages = (request: any) => {
      if (request.action in actionsMap && request.currentDomain) {
        const url = new URL(request.currentDomain);
        setCurrentURL(url);
        setIsOpenDialog(true);
        setActiveAccount(
          rootStore ? rootStore.wallet.findAccountByAddress(rootStore.wallet.activeAddress) : null
        );

        chrome.storage.local.get('whitelist', (result: any) => {
          const whitelist = result.whitelist || {};
          const accountWhitelist = whitelist[rootStore.wallet.activeAddress] || [];
          const existingEntry = accountWhitelist.find(
            (item: { url: string }) => item.url === (url && url.origin && url.origin)
          );

          if (existingEntry) {
            setIsWhitelisted(existingEntry);
          } else {
            setIsWhitelisted(null);
          }
        });

        switch (request.action) {
          case 'getWalletAddress':
            setActionText('Get the address of the current wallet');
            break;
          case 'getNativeBalance':
            setActionText('Get the native balance of the current wallet');
            break;
          case 'sign':
            setActionText('Sign the transaction');
            break;
          case 'signAndSend':
            setActionText('Sign and send the transaction');
            break;
        }
      } else {
        setIsOpenDialog(false);
        setActionText('');
      }
    };

    const disposer = rootStore.api.listen(handleMessages);

    return () => {
      disposer();
    };
  }, [rootStore.api]);

  const handleConfirm = () => {
    if (checkedItems) {
      chrome.runtime.sendMessage({
        action: 'CONFIRM_PERMISSION',
        confirmed: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT,
      });
    } else {
      chrome.runtime.sendMessage({
        action: 'CONFIRM_ONE_TIME_PERMISSION',
        confirmed: false,
        windowId: chrome.windows.WINDOW_ID_CURRENT,
      });
    }
    setIsOpenDialog(false);
  };

  const handleCancel = () => {
    chrome.runtime.sendMessage({
      action: 'CONFIRM_PERMISSION',
      confirmed: false,
      windowId: chrome.windows.WINDOW_ID_CURRENT,
    });
    setIsOpenDialog(false);
  };

  const handleOneConfirm = () => {
    chrome.runtime.sendMessage({
      action: 'CONFIRM_ONE_TIME_PERMISSION',
      confirmed: false,
      windowId: chrome.windows.WINDOW_ID_CURRENT,
    });
    setIsOpenDialog(false);
  };

  return (
    <PagesStoreProvider>
      <VaultWatcher />
      {!isWhitelisted && activeAccount ? (
        <Dialog
          open={isOpenDialog}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              chrome.runtime.sendMessage({
                action: 'CONFIRM_PERMISSION',
                confirmed: false,
                windowId: chrome.windows.WINDOW_ID_CURRENT,
              });
            }
            setIsOpenDialog(isOpen);
          }}
        >
          <DialogContent ref={dialogRef}>
            <DialogHeading title="Confirm connection" />
            <div className={styles.content}>
              <div className={styles.title}>
                <p>Would you like to connect?</p>
                <div className={styles.uppercaseLetter}>
                  {typeof currentURL !== 'string' &&
                    currentURL &&
                    currentURL.hostname &&
                    currentURL.hostname.charAt(0).toUpperCase()}
                </div>
                <div className={styles.host}>
                  <p>
                    {typeof currentURL !== 'string' &&
                      currentURL &&
                      currentURL.hostname &&
                      currentURL.hostname}
                  </p>
                  <span>
                    {typeof currentURL !== 'string' &&
                      currentURL &&
                      currentURL.origin &&
                      currentURL.origin}
                  </span>
                </div>
              </div>
              <div className={styles.center}>
                <hr />
                <div>
                  <div>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m15 9-1.058-1.058-4.192 4.185V3h-1.5v9.127L4.065 7.935 3 9l6 6z"
                        fill="#FFF"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={styles.copyText}>
                <p>{activeAccount && truncateTextInMiddle(activeAccount.name, 18)}</p>
                <div className={styles.copyToClipboard}>
                  <CopyToClipboard
                    value={rootStore.wallet.activeAddress}
                    formatter={truncateAddress}
                  />
                </div>
              </div>
              <div className={styles.checkboxAutoConfirm}>
                <div onClick={() => toggleCheckbox()}>
                  <div className={`${styles.checkbox} ${checkedItems ? styles.checked : ''}`}>
                    {checkedItems && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        focusable="false"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M9.00016 16.17L4.83016 12L3.41016 13.41L9.00016 19L21.0002 6.99997L19.5902 5.58997L9.00016 16.17Z"></path>
                      </svg>
                    )}
                  </div>
                  <p>Auto confirmation of transactions</p>
                </div>
              </div>
            </div>
            <Button fullWidth onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogContent>
        </Dialog>
      ) : isWhitelisted && !isWhitelisted.state ? (
        <Dialog
          open={isOpenDialog}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              chrome.runtime.sendMessage({
                action: 'CONFIRM_PERMISSION',
                confirmed: false,
                windowId: chrome.windows.WINDOW_ID_CURRENT,
              });
            }
            setIsOpenDialog(isOpen);
          }}
        >
          <DialogContent ref={dialogRef}>
            <DialogHeading title="Confirm action" />
            <div className={`${styles.content} ${styles.content2}`}>
              <div className={`${styles.title} ${styles.title2}`}>
                <span>Do you want to allow execute this action?</span>
                <div className={styles.uppercaseLetter}>?</div>
                <div className={`${styles.host} ${styles.host2}`}>
                  <p>
                    {typeof currentURL !== 'string' &&
                      currentURL &&
                      currentURL.origin &&
                      currentURL.origin}
                  </p>
                  <div className={styles.center}>
                    <div>
                      <div>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m15 9-1.058-1.058-4.192 4.185V3h-1.5v9.127L4.065 7.935 3 9l6 6z"
                            fill="#FFF"
                            fill-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p>{actionText}</p>
                </div>
              </div>
            </div>
            <div className={styles.dialogBtns}>
              <Button fullWidth onClick={handleCancel}>
                Cancel
              </Button>
              <Button fullWidth onClick={handleOneConfirm}>
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
      <Pages />
    </PagesStoreProvider>
  );
};
