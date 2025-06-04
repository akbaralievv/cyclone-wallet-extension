import { FC } from 'react';

import styles from './CopyClipboardStep.module.scss';
import { AccountDetails } from './AccountDetails/AccountDetails';

export type CopyClipboardStepProps = {
  onSubmit: () => void;
};

export const CopyClipboardStep: FC<CopyClipboardStepProps> = (props) => {
  const { onSubmit } = props;

  return (
    <div className={styles.root}>
      <AccountDetails onSubmit={onSubmit} />
    </div>
  );
};
