import { Anchor, Card, Title } from '@mantine/core';
import React from 'react';
import { DatabaseIcon } from 'shared/components/icons';
import { Autoplay } from 'swiper';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';

export function HomeRoute(): JSX.Element {
  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}>
        <SwiperSlide>
          <div className="h-72 w-full bg-purple-300 rounded-lg">news! 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-72 w-full bg-purple-300 rounded-lg">news! 2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-72 w-full bg-purple-300 rounded-lg">news! 3</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-72 w-full bg-purple-300 rounded-lg">news! 4</div>
        </SwiperSlide>
      </Swiper>

      <section className="mt-8">
        <Title order={3}>Command center</Title>
        <div className="mt-4 grid grid-cols-3 gap-6">
          <Anchor>
            <Card withBorder shadow="sm" className="flex gap-x-4 items-center">
              <DatabaseIcon width={18} height={18} />
              <p>Applications</p>
            </Card>
          </Anchor>
          <Anchor>
            <Card withBorder shadow="sm" className="flex gap-x-4 items-center">
              <DatabaseIcon width={18} height={18} />
              <p>Employees</p>
            </Card>
          </Anchor>
          <Anchor>
            <Card withBorder shadow="sm" className="flex gap-x-4 items-center">
              <DatabaseIcon width={18} height={18} />
              <p>Learning</p>
            </Card>
          </Anchor>
          <Anchor>
            <Card withBorder shadow="sm" className="flex gap-x-4 items-center">
              <DatabaseIcon width={18} height={18} />
              <p>Recruiting</p>
            </Card>
          </Anchor>
          <Anchor>
            <Card withBorder shadow="sm" className="flex gap-x-4 items-center">
              <DatabaseIcon width={18} height={18} />
              <p>Warehouse</p>
            </Card>
          </Anchor>
          <Anchor>
            <Card withBorder shadow="sm" className="flex gap-x-4 items-center">
              <DatabaseIcon width={18} height={18} />
              <p>Settings</p>
            </Card>
          </Anchor>
        </div>
      </section>
    </div>
  );
}
