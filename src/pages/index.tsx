/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Image, Title } from '@mantine/core';
import React from 'react';
import {
  DocumentsCircleIcon,
  FemaleUserCircleIcon,
  LogoIcon,
  MyspaceCircleIcon,
  NewsCircleIcon,
} from 'shared/components/icons';
import heroImage from 'assets/images/hero-image.png';
import JB from 'assets/images/brands/jusanbank-logo.png';
import Jan from 'assets/images/team/Jan.jpeg';
import Aibek from 'assets/images/team/Aibek.jpeg';
import Almat from 'assets/images/team/Almat.jpeg';
import { ReactComponent as Halyk } from 'assets/images/brands/halyk.svg';
import { ReactComponent as Kaspi } from 'assets/images/brands/kaspi.svg';
import { ReactComponent as AirAstana } from 'assets/images/brands/air-astana.svg';
import { ReactComponent as Technodom } from 'assets/images/brands/technodom.svg';
import { ReactComponent as FF } from 'assets/images/brands/ff.svg';
import { ReactComponent as Eubank } from 'assets/images/brands/eubank.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { useTranslation } from 'react-i18next';
import { Parallax } from 'shared/components/organisms';

export function LandingRoute() {
  const { t } = useTranslation();
  return (
    <div>
      <section className="grid md:grid-cols-7 gap-x-4 mb-12">
        <div className="flex flex-col justify-center items-start gap-y-6 md:col-span-2">
          <h2 className="text-4xl">
            <span className="inline-block relative z-[1] before:bottom-0 before:left-0 before:right-0 before:-z-10 before:absolute before:bg-emerald-300 before:w-full before:h-1/3">
              {t('Advanced')}
            </span>{' '}
            {t('HR Management')}
          </h2>
          <h3>{t('Chosen by the Kazakhstan&apos;s top companies')}</h3>
          <Button variant="filled">{t('Get Started')}</Button>
        </div>
        <div className="relative h-full py-6 md:col-start-4 md:col-span-4">
          <img src={heroImage} alt="hero" />
          <div
            className="absolute animate-blob top-6 -left-12 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply opacity-70"
            style={{
              filter: 'blur(1.5rem)',
            }}
          />
          <div
            className="absolute animate-blob animation-delay-2000 top-2 right-4 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply opacity-70"
            style={{
              filter: 'blur(1.5rem)',
            }}
          />
          <div
            className="absolute animate-blob animation-delay-4000 -bottom-4 left-24 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply opacity-70"
            style={{
              filter: 'blur(1.5rem)',
            }}
          />
        </div>
      </section>

      <section className="bg-gray-100 py-12 my-6 px-3 rounded-lg">
        <div className="flex flex-col items-center text-center">
          <div className="rounded py-2 pl-0.5 border border-gray-300 w-10 h-10 bg-zinc-50">
            <LogoIcon height="100%" />
          </div>
          <h2 className="text-xl mt-3">{t('All-In-One Human Resources Management')}</h2>
          <p className="text-gray-500 mt-2">
            {t('Everything you need to manage incoming and current employees and their data')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-12 px-3">
          <div className="flex flex-col items-center text-center gap-y-1">
            <DocumentsCircleIcon />
            <h3 className="font-bold">{t('Manage any data')}</h3>
            <p className="text-sm text-slate-700">
              {t('Manage and get detailed insights about all your employees and candidates')}
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-y-1">
            <FemaleUserCircleIcon />
            <h3 className="font-bold">{t('Recruite with ease')}</h3>
            <p className="text-sm text-slate-700">
              {t('Handle recruitment process from the first interview until hiring')}
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-y-1">
            <NewsCircleIcon />
            <h3 className="font-bold">{t('Reach everyone')}</h3>
            <p className="text-sm text-slate-700">
              {t('Share your important organization-wide announcements to the whole company')}
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-y-1">
            <MyspaceCircleIcon />
            <h3 className="font-bold">{t('Grow the company')}</h3>
            <p className="text-sm text-slate-700">
              {t('HR Vita is a central hub for digitizing your company&apos;s organizational life')}
            </p>
          </div>
        </div>
      </section>

      <section className="my-24">
        <h2 className="text-2xl mb-10 text-center">{t('Our partners')}</h2>
        <Swiper
          slidesPerView="auto"
          spaceBetween={40}
          speed={3000}
          loop
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          grabCursor
          modules={[Autoplay]}
          className="brands">
          <SwiperSlide
            style={{
              height: 100,
              width: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Halyk width={200} height={60} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Kaspi width={200} height={60} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AirAstana width={200} height={60} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Technodom width={200} height={60} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <div
              style={{
                width: 200,
                marginTop: 10,
              }}>
              <img src={JB} alt="Jusan bank" />
            </div>
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Eubank width={200} height={45} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FF width={200} height={60} />
          </SwiperSlide>
        </Swiper>
      </section>

      <section>
        <h2 className="text-2xl text-center mb-12">Наша команда</h2>
        <div className="flex flex-wrap relative gap-12 justify-center pt-12">
          <div
            className="absolute animate-blob top-2 left-1/4 w-32 h-32 bg-orange-300 rounded-full mix-blend-multiply opacity-70"
            style={{
              filter: 'blur(1.5rem)',
            }}
          />
          <div
            className="absolute animate-blob animation-delay-2000 top-2 right-1/4 w-32 h-32 bg-sky-300 rounded-full mix-blend-multiply opacity-70"
            style={{
              filter: 'blur(1.5rem)',
            }}
          />
          <div
            className="absolute animate-blob animation-delay-4000 -bottom-4 left-1/2 w-32 h-32 bg-green-300 rounded-full mix-blend-multiply opacity-70"
            style={{
              filter: 'blur(1.5rem)',
            }}
          />
          <Parallax offset={20}>
            <img src={Almat} alt="Ержанов Алмат" className="rounded-md object-cover w-64 h-64" />
            <div className="mt-2 text-center">
              <Title className="font-normal" order={4}>
                Ержанов Алмат
              </Title>
              <p className="text-sm text-slate-500">SEO</p>
            </div>
          </Parallax>
          <Parallax offset={40}>
            <img src={Aibek} alt="Айбек Альжан" className="rounded-md object-cover w-64 h-64" />
            <div className="mt-2 text-center">
              <Title className="font-normal" order={4}>
                Айбек Альжан
              </Title>
              <p className="text-sm text-slate-500">SEO</p>
            </div>
          </Parallax>
          <Parallax offset={20}>
            <img src={Jan} alt="Жандаулет Камалов" className="rounded-md object-cover w-64 h-64" />
            <div className="mt-2 text-center">
              <Title className="font-normal" order={4}>
                Жандаулет Камалов
              </Title>
              <p className="text-sm text-slate-500">SEO</p>
            </div>
          </Parallax>
        </div>
      </section>

      <section className="my-24">
        <h2 className="text-2xl mb-10 text-center">{t('Our partners')}</h2>
        <Swiper
          slidesPerView="auto"
          spaceBetween={40}
          speed={3000}
          loop
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          grabCursor
          modules={[Autoplay]}
          className="brands">
          <SwiperSlide
            style={{
              height: 100,
              width: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Halyk width={200} height={60} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Kaspi width={200} height={60} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AirAstana width={200} height={60} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Technodom width={200} height={60} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <div
              style={{
                width: 200,
                marginTop: 10,
              }}>
              <img src={JB} alt="Jusan bank" />
            </div>
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Eubank width={200} height={45} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FF width={200} height={60} />
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="my-24">
        <h2 className="text-2xl mb-10 text-center">{t('Our partners')}</h2>
        <Swiper
          slidesPerView="auto"
          spaceBetween={40}
          speed={3000}
          loop
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          grabCursor
          modules={[Autoplay]}
          className="brands">
          <SwiperSlide
            style={{
              height: 100,
              width: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Halyk width={200} height={60} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Kaspi width={200} height={60} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AirAstana width={200} height={60} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Technodom width={200} height={60} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <div
              style={{
                width: 200,
                marginTop: 10,
              }}>
              <img src={JB} alt="Jusan bank" />
            </div>
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Eubank width={200} height={45} />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: 100,
              width: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FF width={200} height={60} />
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
}
