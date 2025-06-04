import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { Button, DashBorderedBlock, FormItem } from 'components';
import attention from 'assets/images/svg/attention.svg';

import styles from './AccountDetails.module.scss';
import { AccountInfo } from '../../../common';
import { useRootStore } from '../../../../core';

export type AccountDetailsProps = {
  onSubmit: () => void;
};

export const AccountDetails: FC<AccountDetailsProps> = observer(function AccountDetails_({
  onSubmit,
}) {
  const rootStore = useRootStore();

  const account = rootStore.wallet.findAccountByAddress(rootStore.wallet.activeAccount.address);

  if (!account) return null;

  const handleCopyClick = () => {
    if (!window.isSecureContext) return;
    navigator.clipboard.writeText(account.pk).catch((e) => {
      console.log('Error during copying error message', e);
    });
  };

  const handleStartClick = () => {
    if (!window.isSecureContext) return;
    const textToCopy = `Wallet Address: ${rootStore.wallet.activeAccount.address}\nPrivate Key: ${account.pk}`;
    navigator.clipboard.writeText(textToCopy).catch((e) => {
      console.log('Error during copying error message', e);
    });
    onSubmit();
  };

  return (
    <div className={styles.root}>
      <div className={styles.accountInfo}>
        <AccountInfo />
      </div>
      <div className={styles.content}>
        <div className={styles.details}>
          <FormItem warning="Never show or share your Private key with anyone!">
            <div className={styles.privateKeyWrapper}>
              <DashBorderedBlock onClick={handleCopyClick}>
                <div className={styles.privateKey}>
                  <div className={styles.privateKeyTitle}>Private Key</div>
                  <div className={styles.privateKeyKey}>{account.pk}</div>
                </div>
              </DashBorderedBlock>
            </div>
          </FormItem>
          <div className={styles.attention}>
            <img src={attention} alt="Attention Illustration" width={50} height={40} />
            <span className={styles.attentionTitle}>Don’t remember your password?</span>
            <p className={styles.attentionDescription}>
              Alas, no one in the world will be able to restore it. Before resetting the cache, try
              to remember the password again and again!
            </p>
          </div>
          <Button fullWidth onClick={handleStartClick}>
            Copy to Clipboard & Start
          </Button>
        </div>
      </div>
    </div>
  );
});
