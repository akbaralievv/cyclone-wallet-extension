import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button, FormItem, Input } from 'components';

import styles from './RepeatPasswordStep.module.scss';
import { CreateAccountRepeatFormValues, StepProps } from '../types';

export type RepeatPasswordStepProps = StepProps & {
  formPassword: string;
};

export const RepeatPasswordStep: FC<RepeatPasswordStepProps> = (props) => {
  const { formPassword, onSubmit } = props;

  const formContext = useFormContext<CreateAccountRepeatFormValues>();

  const repeatPasswordController = (
    <Controller
      name="password"
      control={formContext.control}
      rules={{
        required: true,
        validate: (value) => {
          if (value !== formPassword) return 'Invalid password';
          return true;
        },
      }}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Input.Password
          autoFocus
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          legend="Repeat Password"
          placeholder="Enter your Password again"
        />
      )}
    />
  );

  return (
    <form className={styles.root} onSubmit={formContext.handleSubmit(onSubmit)}>
      <div className={styles.content}>
        <img
          className={styles.image}
          src="assets/images/svg/brain.svg"
          width={92}
          height={74}
          alt="Brain Illustration"
        />
        <FormItem
          warning={formContext.formState.errors.password?.message}
          info="Don’t share you password with anyone"
          noIcon
        >
          {repeatPasswordController}
        </FormItem>
      </div>
      <Button
        htmlType="submit"
        fullWidth
        disabled={!formContext.formState.isDirty || formContext.formState.isSubmitting}
      >
        Next
      </Button>
    </form>
  );
};
