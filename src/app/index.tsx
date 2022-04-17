/* eslint-disable jsx-a11y/anchor-is-valid */
import { MantineProvider } from '@mantine/core';
import { Role } from 'entities/Session';
import { LandingRoute } from 'pages';
import { ApprovalDetailsRoute } from 'pages/approvals/[id]';
import { NewCandidateRoute } from 'pages/candidates/new';
import { EmployeesIndexRoute } from 'pages/employees';
import { CreateEmployeeRoute } from 'pages/employees/new';
import { EmployeeDetailsRoute } from 'pages/employees/[id]';
import { EventsRoute } from 'pages/events';
import { HomeRoute } from 'pages/home';
import { InterviewDetailsRoute } from 'pages/interviews/[id]';
import { ProfileRoute } from 'pages/profile/[id]';
import { RecruitingIndexRoute } from 'pages/recruiting';
import { RecruitingDetailsRoute } from 'pages/recruiting/[id]';
import { ChangePasswordRoute } from 'pages/users/change-password';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar, ProtectedRoute } from 'shared/components/organisms';
// Import Swiper styles
import 'swiper/css';
import { AuthProvider } from './providers';
import './styles/index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          theme={{
            primaryColor: 'teal',
          }}>
          <AuthProvider>
            <Navbar />
            <main className="container my-6 flex-1">
              <Routes>
                <Route path="/" element={<LandingRoute />} />
                <Route path="/home" element={<HomeRoute />} />
                <Route path="profile/:id" element={<ProfileRoute />} />
                <Route path="recruiting" element={<ProtectedRoute allowed={[Role.HR, Role.ADMIN]} />}>
                  <Route index element={<RecruitingIndexRoute />} />
                  <Route path=":id" element={<RecruitingDetailsRoute />} />
                </Route>
                <Route path="employees">
                  <Route index element={<EmployeesIndexRoute />} />
                  <Route element={<ProtectedRoute allowed={[Role.HR, Role.ADMIN]} />}>
                    <Route path="new" element={<CreateEmployeeRoute />} />
                    <Route path=":id" element={<EmployeeDetailsRoute />} />
                  </Route>
                </Route>
                <Route path="interviews">
                  <Route path=":id" element={<InterviewDetailsRoute />} />
                </Route>
                <Route path="approvals">
                  <Route path=":id" element={<ApprovalDetailsRoute />} />
                </Route>
                <Route path="candidates">
                  <Route path="new" element={<NewCandidateRoute />} />
                </Route>
                <Route path="users">
                  <Route path="generate-hash" element={<ChangePasswordRoute />} />
                </Route>
                <Route path="events">
                  <Route index element={<EventsRoute />} />
                </Route>
              </Routes>
            </main>

            <footer
              id="footer"
              className="bg-gray-100 text-slate-500 pt-16 pb-10 px-4 flex flex-col items-center gap-y-4">
              <nav className="flex flex-wrap gap-x-4">
                <a className="text-slate-500" href="#footer">
                  About us
                </a>
                <a className="text-slate-500" href="#footer">
                  Guides
                </a>
                <a className="text-slate-500" href="#footer">
                  Pricing
                </a>
                <a className="text-slate-500" href="#footer">
                  Careers
                </a>
                <a className="text-slate-500" href="#footer">
                  Partners
                </a>
              </nav>
              <nav>
                <a className="text-slate-500" href="#footer">
                  About us
                </a>
                <a className="text-slate-500" href="#footer">
                  Guides
                </a>
                <a className="text-slate-500" href="#footer">
                  Pricing
                </a>
                <a className="text-slate-500" href="#footer">
                  Careers
                </a>
                <a className="text-slate-500" href="#footer">
                  Partners
                </a>
              </nav>
              <p>@ {new Date().getFullYear()} HR Vita, Inc. All rights reserved.</p>
            </footer>
          </AuthProvider>
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
