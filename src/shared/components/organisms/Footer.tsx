import React from 'react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'shared/components/icons';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer
      id="footer"
      className="bg-gray-100 text-slate-500 pt-6 md:pt-16 pb-4 md:pb-10 px-4 flex flex-col items-center gap-y-4 md:gap-y-5">
      <nav className="flex flex-wrap gap-x-4 justify-center">
        <a className="text-slate-500" href="#footer">
          {t('About us')}
        </a>
        <a className="text-slate-500" href="#footer">
          {t('Guides')}
        </a>
        <a className="text-slate-500" href="#footer">
          {t('Pricing')}
        </a>
        <a className="text-slate-500" href="#footer">
          {t('Careers')}
        </a>
        <a className="text-slate-500" href="#footer">
          {t('Partners')}
        </a>
      </nav>
      <nav className="flex gap-x-4">
        <a className="text-slate-500" href="#footer">
          <FacebookIcon className="w-5 h-5" />
        </a>
        <a className="text-slate-500" href="#footer">
          <InstagramIcon className="w-5 h-5" />
        </a>
        <a className="text-slate-500" href="#footer">
          <LinkedinIcon className="w-5 h-5" />
        </a>
        <a className="text-slate-500" href="#footer">
          <TwitterIcon className="w-5 h-5" />
        </a>
      </nav>
      <p className="text-sm">
        @ {new Date().getFullYear()} {t('HR Vita, Inc. All rights reserved.')}
      </p>
    </footer>
  );
}
