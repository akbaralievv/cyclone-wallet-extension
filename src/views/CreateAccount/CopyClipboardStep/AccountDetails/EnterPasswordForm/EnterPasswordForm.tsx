import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';

import { Button, FormItem, Input } from 'components';
import { useRootStore } from 'core';

import styles from './EnterPasswordForm.module.scss';

type FormValues = {
  password: string;
};

type EnterPasswordFormProps = {
  onSubmitSuccess(): void;
};

export const EnterPasswordForm: FC<EnterPasswordFormProps> = observer(function EnterPasswordForm_(
  props
) {
  const { onSubmitSuccess } = props;

  const rootStore = useRootStore();

  const form = useForm<FormValues>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      password: '',
    },
  });

  const handleSubmit = () => {
    try {
      onSubmitSuccess();
    } catch (e) {
      console.log(e);
    }
  };

  const passwordController = (
    <Controller
      name="password"
      control={form.control}
      rules={{
        required: true,
        validate: (value) => {
          if (value !== rootStore.vault.password) return 'Invalid password';
          return true;
        },
      }}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Input.Password
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          legend="Password"
        />
      )}
    />
  );

  return (
    <div className={styles.root}>
      <span className={styles.title}>Enter Password to See a Key</span>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={styles.form}>
        <FormItem
          warning={form.formState.errors.password?.message}
          info="Never disclose this key. Anyone with your private keys
 can steal any assets held in your account."
        >
          {passwordController}
        </FormItem>
        <Button htmlType="submit" fullWidth>
          Show Key
        </Button>
      </form>
    </div>
  );
});
