import React from 'react';
import { Alert, Anchor, Button, LoadingOverlay, PasswordInput, Text, TextInput } from '@mantine/core';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from 'app/providers';
import { AlertCircleIcon } from 'shared/components/icons';
import { useTranslation } from 'react-i18next';
import { useModalState } from 'shared/components/organisms/Modal/context';
import { VisibilityToggleIcon } from './VisibilityToggleIcon';

type LoginFormInputs = {
  email: string;
  password: string;
};

export function LoginForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { login, authError, isAuthLoading } = useAuth();

  const onSubmit = (data: LoginFormInputs) => {
    login(data);
  };

  const { closeModal } = useModalState();

  const { t } = useTranslation();

  return (
    <form className="space-y-4 relative" onSubmit={handleSubmit(onSubmit)}>
      {authError && (
        <Alert icon={<AlertCircleIcon />} color="red">
          {authError.message}
        </Alert>
      )}
      <LoadingOverlay visible={isAuthLoading} />
      <TextInput
        label={t('Email')}
        placeholder={t('Email')}
        className="mb-1 font-medium block"
        type="email"
        {...register('email', { required: 'Необходимо заполнить' })}
        error={errors.email?.message}
      />
      <div>
        <div className="flex justify-between mb-1">
          <Text component="label" htmlFor="your-password" size="sm" weight={500}>
            {t('Your password')}
          </Text>
          <Anchor<typeof Link>
            component={Link}
            to="/users/change-password"
            onClick={closeModal}
            sx={(theme) => ({
              paddingTop: 2,
              color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
              fontWeight: 500,
              fontSize: theme.fontSizes.xs,
            })}>
            {t('Forgot your password?')}
          </Anchor>
        </div>
        <PasswordInput
          placeholder={t('Your password')}
          id="your-password"
          visibilityToggleIcon={VisibilityToggleIcon}
          {...register('password', { required: 'Необходимо заполнить' })}
          error={errors.password?.message}
        />
      </div>
      <Button type="submit" className="ml-auto block">
        {t('Log in')}
      </Button>
    </form>
  );
}
