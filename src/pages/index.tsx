import { Button, Title } from '@mantine/core';
import heroImage from 'assets/images/hero-image.png';
import React from 'react';

export function LandingRoute() {
  return (
    <div>
      <section className="grid grid-cols-7 gap-x-4 ">
        <div className="flex flex-col justify-center items-start gap-y-6 col-span-2">
          <h2 className="text-4xl">
            <span className="inline-block relative z-[1] before:bottom-0 before:left-0 before:right-0 before:-z-10 before:absolute before:bg-emerald-300 before:w-full before:h-1/3">
              Advanced
            </span>{' '}
            HR Management
          </h2>
          <h3>Chosen by the Kazakhstan&apos;s top companies</h3>
          <Button variant="filled">Get Started Free</Button>
        </div>
        <div className="relative h-full py-6 col-start-4 col-span-4">
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
    </div>
  );
}
