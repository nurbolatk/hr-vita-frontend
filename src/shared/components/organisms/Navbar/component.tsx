import { createStyles, Avatar, Badge, Button, Menu, Skeleton, Text, UnstyledButton, Anchor } from '@mantine/core';
import { useAuth } from 'app/providers';
import { api, Notification } from 'entities/Notifications';
import { LoginForm } from 'entities/Session';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import {
  BriefcaseIcon,
  ChevronDownIcon,
  HomeIcon,
  LogoIcon,
  LogOutIcon,
  MailIcon,
  UserIcon,
  UserPlusIcon,
} from 'shared/components/icons';
import { Modal } from 'shared/components/organisms';
import { iff } from 'shared/utils';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]}`,
    marginBottom: 120,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  hideOnMobile: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  hideOnDesktop: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
    },
    [theme.fn.smallerThan('xs')]: {
      padding: 2,
      borderRadius: theme.radius.xl,
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tabControl: {
    fontWeight: 500,
    height: 38,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },
  },

  tabControlActive: {
    borderColor: `${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]} !important`,
  },
}));
export function Navbar(): JSX.Element {
  const { t } = useTranslation();
  const { user, token, isAuthLoading, logout, isAuthSuccess } = useAuth();
  const { classes, cx } = useStyles();
  const navigate = useNavigate();

  const notifications = useQuery<Notification[]>(['notifications', user?.id], () => api.getAll(token), {
    enabled: !!user?.id && !!token,
  });

  const unreadCount = notifications.data?.reduce((acc, cur) => {
    return cur.unread ? acc + 1 : acc;
  }, 0);

  const [userMenuOpened, setUserMenuOpened] = useState(false);
  return (
    <header className="container flex justify-between md:justify-start items-center">
      <div className="md:w-0 md:flex-1">
        <Anchor<typeof Link> underline={false} component={Link} to="/" className="flex items-center gap-1">
          <LogoIcon width={24} height={24} />
          <Text component="h1" color="teal" weight={600}>
            HR Vita
          </Text>
        </Anchor>
      </div>
      <ul className="sm:flex items-center gap-x-4 hidden">
        <li>
          <Link to="/">{t('Home')}</Link>
        </li>
        {user?.isHR && (
          <>
            <li>
              <Link to="/recruiting">{t('Recruiting')}</Link>
            </li>
            <li>
              <Link to="/employees">{t('Employees')}</Link>
            </li>
          </>
        )}
      </ul>
      <ul className="md:w-0 md:flex-1 flex justify-end gap-x-4 items-center">
        <Modal>
          {user ? (
            <Menu
              size={260}
              placement="end"
              transition="pop-top-right"
              // className={classes.userMenu}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              control={
                <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
                  <div className={cx(classes.hideOnMobile, 'sm:flex items-center gap-x-2')}>
                    <UserIcon width={14} height={14} />
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
                      {user.firstName} {user.lastName}
                    </Text>
                    {unreadCount ? (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
                      </span>
                    ) : null}
                    <ChevronDownIcon width={14} height={14} />
                  </div>
                  <Avatar
                    className={cx(classes.hideOnDesktop)}
                    color="teal"
                    src={null}
                    alt={user.firstName ?? 'user avatar'}
                    radius="xl"
                    size="sm"
                  />
                </UnstyledButton>
              }>
              <div className={cx(classes.hideOnDesktop)}>
                <Menu.Label>{t('Work')}</Menu.Label>
                <Menu.Item onClick={() => navigate('/')} icon={<HomeIcon width={14} height={14} />}>
                  {t('Home')}
                </Menu.Item>
                {user.isHR && (
                  <Menu.Item onClick={() => navigate('/recruiting')} icon={<UserPlusIcon width={14} height={14} />}>
                    {t('Recruiting')}
                  </Menu.Item>
                )}
                <Menu.Item onClick={() => navigate('/employees')} icon={<BriefcaseIcon width={12} height={14} />}>
                  {t('Employees')}
                </Menu.Item>
              </div>
              <Menu.Label>{t('Account')}</Menu.Label>
              <Menu.Item onClick={() => navigate(`/profile/${user.id}`)} icon={<UserIcon width={14} height={14} />}>
                {t('Profile')}
              </Menu.Item>
              <Menu.Item onClick={() => navigate('/events')} icon={<MailIcon width={14} height={14} />}>
                <div className="flex items-center gap-x-2">
                  <p>{t('Notifications')} </p>
                  {unreadCount ? (
                    <Badge variant="filled" color="teal" size="xs" radius="xl">
                      {unreadCount}
                    </Badge>
                  ) : null}
                </div>
              </Menu.Item>
              <Menu.Item onClick={logout} icon={<LogOutIcon width={14} height={14} />}>
                {t('Logout')}
              </Menu.Item>
            </Menu>
          ) : (
            iff(
              isAuthLoading,
              <li>
                <Skeleton height={24} width={128} visible />
              </li>,
              <li>
                <Modal.OpenButton>
                  <Button compact variant="filled" size="sm">
                    Войти
                  </Button>
                </Modal.OpenButton>
              </li>
            )
          )}
          <Modal.Content title={t('Log in')} className="max-w-md">
            <LoginForm />
          </Modal.Content>
          <Modal.CloseOn condition={isAuthSuccess} />
        </Modal>
      </ul>
    </header>
  );
}
