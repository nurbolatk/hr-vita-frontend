/* eslint-disable jsx-a11y/anchor-is-valid */
import { LoadingOverlay, MantineProvider } from '@mantine/core';
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
import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Navbar, ProtectedRoute } from 'shared/components/organisms';
// Import Swiper styles
import 'swiper/css';
import './styles/index.css';

import './i18n';

import { AuthProvider } from './providers';

const queryClient = new QueryClient();

function App() {
  return (
    <Suspense fallback={<LoadingOverlay visible />}>
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
                    <Route path="change-password" element={<ChangePasswordRoute />} />
                  </Route>
                  <Route path="events">
                    <Route index element={<EventsRoute />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
            </AuthProvider>
          </MantineProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
