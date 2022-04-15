import { MantineProvider } from '@mantine/core';
import { Role } from 'entities/Session';
import { LandingRoute } from 'pages';
import { ApprovalDetailsRoute } from 'pages/approvals/[id]';
import { CabinateRoute } from 'pages/cabinet';
import { NewCandidateRoute } from 'pages/candidates/new';
import { EmployeesIndexRoute } from 'pages/employees';
import { CreateEmployeeRoute } from 'pages/employees/new';
import { EmployeeDetailsRoute } from 'pages/employees/[id]';
import { EventsRoute } from 'pages/events';
import { HomeRoute } from 'pages/home';
import { InterviewDetailsRoute } from 'pages/interviews/[id]';
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
            <main className="container my-6">
              <Routes>
                <Route path="/" element={<LandingRoute />} />
                <Route path="/home" element={<HomeRoute />} />
                <Route path="cabinet" element={<CabinateRoute />} />
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
          </AuthProvider>
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
