import { Anchor, Button, Input, PasswordInput, Text } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'components/organisms/Modal';
import { EyeOffIcon, EyeOpenIcon } from 'components/icons';

function VisibilityToggleIcon({ reveal, size }: { reveal: boolean; size: number }) {
  if (reveal) {
    return <EyeOpenIcon width={size} height={size} />;
  }
  return <EyeOffIcon width={size} height={size} />;
}

export function Navbar(): JSX.Element {
  return (
    <header className="container flex justify-between md:justify-start items-center">
      <div className="text-3xl font-bold underline md:w-0 md:flex-1">
        <Link to="/">HR Vita</Link>
      </div>
      <ul className="flex items-center gap-x-4">
        <li>
          <Link to="/applications">Заявки</Link>
        </li>
        <li>
          <Link to="/cabinet">Мой кабинет</Link>
        </li>
      </ul>
      <ul className="md:w-0 md:flex-1 flex justify-end gap-x-4">
        <Modal>
          <li>
            <Modal.OpenButton>
              <Button variant="outline" size="sm">
                Войти
              </Button>
            </Modal.OpenButton>
          </li>
          <Modal.Content title="Log in" className="max-w-md">
            <form className="space-y-4">
              <div>
                <Text component="label" htmlFor="email" size="sm" className="mb-1 font-medium block">
                  Email
                </Text>
                <Input type="email" placeholder="Email" id="email" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <Text component="label" htmlFor="your-password" size="sm" weight={500}>
                    Your password
                  </Text>
                  <Anchor<typeof Link>
                    component={Link}
                    to="/restore-password"
                    sx={(theme) => ({
                      paddingTop: 2,
                      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
                      fontWeight: 500,
                      fontSize: theme.fontSizes.xs,
                    })}>
                    Forgot your password?
                  </Anchor>
                </div>
                <PasswordInput
                  placeholder="Your password"
                  id="your-password"
                  visibilityToggleIcon={VisibilityToggleIcon}
                />
              </div>
            </form>
          </Modal.Content>
        </Modal>
      </ul>
    </header>
  );
}
