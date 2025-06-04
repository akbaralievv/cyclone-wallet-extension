import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { WelcomeBack } from 'views';
import { PageLayout } from 'layouts';
import { useRootStore } from 'core';

import styles from './WelcomeBackPage.module.scss';

export const WelcomeBackPage = observer(function WelcomeBackPage_() {
  const rootStore = useRootStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (rootStore.vault.password) {
      navigate('/');
    }
  }, [rootStore.vault.password]);

  const onSubmitSuccess = () => {
    navigate('/');
  };

  return (
    <PageLayout title="Welcome Back">
      <div className={styles.root}>
        <WelcomeBack onSubmitSuccess={onSubmitSuccess} />
      </div>
    </PageLayout>
  );
});
