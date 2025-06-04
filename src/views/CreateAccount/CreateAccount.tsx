import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';

import { useRootStore } from 'core';

import styles from './CreateAccount.module.scss';
import { NewAccountStep } from './NewAccountStep/NewAccountStep';
import { RepeatPasswordStep } from './RepeatPasswordStep/RepeatPasswordStep';
import {
  CreateAccountFormValues,
  CreateAccountRepeatFormValues,
  CreateAccountStepConfig,
} from './types';
import { CopyClipboardStep } from './CopyClipboardStep/CopyClipboardStep';

export type CreateAccountProps = {
  importPk?: string;
  onSubmitSuccess(): void;
  onStepConfigChange(step: CreateAccountStepConfig): void;
};

export const CreateAccount: FC<CreateAccountProps> = observer(function CreateAccount_(props) {
  const { importPk, onSubmitSuccess, onStepConfigChange } = props;

  const rootStore = useRootStore();

  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<CreateAccountFormValues>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      password: '',
    },
  });

  const repeatForm = useForm<CreateAccountRepeatFormValues>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      password: '',
    },
  });

  const watchPassword = form.watch('password');

  const handleSubmit = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleRepeatSubmit = async () => {
    try {
      const values = form.getValues();
      await rootStore.vault.submitPassword(values.password);
      rootStore.wallet.addAccount(values.name, importPk);
      handleSubmit();
      // onSubmitSuccess();
    } catch (e) {
      console.log(e);
    }
  };

  const stepsConfig: CreateAccountStepConfig[] = [
    {
      title: 'Create New Account',
      content: (
        <FormProvider {...form}>
          <NewAccountStep onSubmit={handleSubmit} />
        </FormProvider>
      ),
      back: '/login',
    },
    {
      title: 'Memorize Your Password',
      content: (
        <FormProvider {...repeatForm}>
          <RepeatPasswordStep formPassword={watchPassword} onSubmit={handleRepeatSubmit} />
        </FormProvider>
      ),
      back: () => {
        setCurrentStep(currentStep - 1);
      },
    },
    {
      title: 'Your Account Details',
      content: <CopyClipboardStep onSubmit={onSubmitSuccess} />,
      back: () => {
        setCurrentStep(currentStep - 1);
      },
    },
  ];

  const activeStepConfig = stepsConfig[currentStep];

  useEffect(() => {
    onStepConfigChange(activeStepConfig);
  }, [currentStep]);

  return <div className={styles.root}>{activeStepConfig.content}</div>;
});
