import { Alert, Anchor, Button, Card, PasswordInput, TextInput, Title } from '@mantine/core';
import { auth } from 'entities/Session';
import { VisibilityToggleIcon } from 'entities/Session/components/LoginForm/VisibilityToggleIcon';
import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface PasswordFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function ChangePasswordRoute() {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitetd] = useState<boolean>(false);

  const mutation = useMutation((data: { email: string; password: string }) => {
    return auth.changePassword(data.email, data.password);
  });

  const handleSubmit = (event: FormEvent<PasswordFormElement>) => {
    event.preventDefault();
    if (!isSubmitted) {
      setIsSubmitetd(true);
    } else {
      mutation.mutate({
        email: event.currentTarget.elements.email.value,
        password: event.currentTarget.elements.password.value,
      });
    }
  };

  return (
    <section>
      <Title order={2} className="text-center">
        {t('Change password')}
      </Title>
      <Card withBorder shadow="md" className="max-w-lg mt-4 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-3">
          <TextInput
            label={t('Email')}
            type="email"
            name="email"
            required
            description={t('Enter email address of your account')}
          />
          {isSubmitted && (
            <PasswordInput
              label={t('New password')}
              placeholder={t('Your password')}
              visibilityToggleIcon={VisibilityToggleIcon}
              name="password"
              required
              minLength={6}
              description={t('Minimum 6 symbols')}
            />
          )}
          {mutation.isError ? (
            <Alert color="red" title={t('Success')}>
              There was error with the request.{' '}
              <Anchor component="button" type="submit" color="red" size="sm">
                Try again
              </Anchor>
            </Alert>
          ) : mutation.isSuccess ? (
            <Alert title={t('Success')}>
              The password has changed!{' '}
              <Anchor<typeof Link> component={Link} to="/" size="sm">
                Go home
              </Anchor>
            </Alert>
          ) : (
            <Button loading={mutation.isLoading} type="submit">
              {t('Submit')}
            </Button>
          )}
        </form>
      </Card>
    </section>
  );
}
