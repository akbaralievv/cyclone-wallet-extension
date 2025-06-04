import { FC } from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { CopyToClipboard } from 'components';
import { ArrowDropdown } from 'components/icons';
import { truncateAddress } from 'utils/address';
import { useRootStore } from 'core';
import { truncateTextInMiddle } from 'utils/textFormat';

import styles from './AccountInfo.module.scss';

export type AccountInfoProps = {
  hasLink?: boolean;
};

export const AccountInfo: FC<AccountInfoProps> = observer(function AccountInfo_(props) {
  const { hasLink } = props;

  const rootStore = useRootStore();

  const location = useLocation();

  const isAccountsPathname = location.pathname === '/accounts';

  const account = rootStore.wallet.activeAccount;
  let finalAccount = account;
  if (!finalAccount) {
    finalAccount = rootStore.wallet.findAccountByAddress(rootStore.wallet.activeAddress);
    if (!finalAccount) return null;
  }

  const truncatedName = truncateTextInMiddle(finalAccount.name, 18);

  return (
    <div className={cn(styles.root, isAccountsPathname && styles.nameDropdownOpened)}>
      {hasLink ? (
        <Link to={isAccountsPathname ? '/' : '/accounts'} className={styles.nameDropdown}>
          <span>{truncatedName}</span>
          <ArrowDropdown width={14} height={14} className={styles.nameDropdownIcon} />
        </Link>
      ) : (
        <div className={styles.nameDropdown}>{truncatedName}</div>
      )}
      <div className={styles.copyToClipboard}>
        <CopyToClipboard value={finalAccount?.address} formatter={truncateAddress} />
      </div>
    </div>
  );
});
