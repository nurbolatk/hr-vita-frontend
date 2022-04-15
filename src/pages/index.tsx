import { Button } from '@mantine/core';
import React from 'react';
import {
  DocumentsCircleIcon,
  FemaleUserCircleIcon,
  LogoIcon,
  MyspaceCircleIcon,
  NewsCircleIcon,
} from 'shared/components/icons';
import heroImage from 'assets/images/hero-image.png';
import employeesImage from 'assets/images/employees.png';

export function LandingRoute() {
  return (
    <div>
      <section className="grid md:grid-cols-7 gap-x-4 mb-12">
        <div className="flex flex-col justify-center items-start gap-y-6 md:col-span-2">
          <h2 className="text-4xl">
            <span className="inline-block relative z-[1] before:bottom-0 before:left-0 before:right-0 before:-z-10 before:absolute before:bg-emerald-300 before:w-full before:h-1/3">
              Advanced
            </span>{' '}
            HR Management
          </h2>
          <h3>Chosen by the Kazakhstan&apos;s top companies</h3>
          <Button variant="filled">Get Started Free</Button>
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
          <h2 className="text-xl mt-3">All-In-One Human Resources Management</h2>
          <p className="text-gray-500 mt-2">
            Everything you need to manage incoming and current employees and their data
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-12 px-3">
          <div className="flex flex-col items-center text-center gap-y-1">
            <DocumentsCircleIcon />
            <h3 className="font-bold">Manage any data</h3>
            <p className="text-sm text-slate-700">
              Manage and get detailed insights about all your employees and candidates
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-y-1">
            <FemaleUserCircleIcon />
            <h3 className="font-bold">Recruite with ease</h3>
            <p className="text-sm text-slate-700">Handle recruitment process from the first interview until hiring</p>
          </div>
          <div className="flex flex-col items-center text-center gap-y-1">
            <NewsCircleIcon />
            <h3 className="font-bold">Reach everyone</h3>
            <p className="text-sm text-slate-700">
              Share your important organization-wide announcements to the whole company
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-y-1">
            <MyspaceCircleIcon />
            <h3 className="font-bold">Grow the company</h3>
            <p className="text-sm text-slate-700">
              HR Vita is a central hub for digitizing your company&apos;s organizational life
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 mt-6 px-3 bg-gradient-to-b from-gray-50 to-emerald-50 w-screen relative ml-[-50vw] left-1/2">
        <div className="grid grid-cols-2">
          <div className="rounded-lg overflow-hidden">
            <img src={employeesImage} alt="Employees" />
          </div>
          <h2 className="text-xl">Fully featured database for all your emplyees and candidates</h2>
        </div>
      </section>
      <section className="py-12 px-3 bg-gradient-to-b from-gray-50 to-emerald-50 w-screen relative ml-[-50vw] left-1/2">
        <div className="grid grid-cols-2">
          <h2 className="text-xl">Appoint interviews</h2>
          <div className="rounded-lg overflow-hidden">
            <img src={employeesImage} alt="Employees" />
          </div>
        </div>
      </section>
      <section className="py-12 px-3 bg-gradient-to-b from-gray-50 to-emerald-50 w-screen relative ml-[-50vw] left-1/2">
        <div className="grid grid-cols-2">
          <div className="rounded-lg overflow-hidden">
            <img src={employeesImage} alt="Employees" />
          </div>
          <h2 className="text-xl">Organize company&apos;s life here</h2>
        </div>
      </section>
    </div>
  );
}
