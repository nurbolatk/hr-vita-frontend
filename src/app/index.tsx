import { MantineProvider } from '@mantine/core';
import { CabinateRoute } from 'pages/cabinet';
import { NewCandidateRoute } from 'pages/candidates/new';
import { HomeRoute } from 'pages/home';
import { RecruitingIndexRoute } from 'pages/recruiting';
import { ChangePasswordRoute } from 'pages/users/change-password';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from 'shared/components/organisms';
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
                <Route path="/" element={<HomeRoute />} />
                <Route path="cabinet" element={<CabinateRoute />} />
                <Route path="recruiting" element={<RecruitingIndexRoute />} />
                <Route path="candidates">
                  <Route path="new" element={<NewCandidateRoute />} />
                </Route>
                <Route path="users">
                  <Route path="generate-hash" element={<ChangePasswordRoute />} />
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
