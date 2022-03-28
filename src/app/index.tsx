import React from 'react';
import { Navbar } from 'shared/components/organisms';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import { CabinateRoute } from 'pages/cabinet';
import { NewCandidateRoute } from 'pages/candidates/new';
import { ChangePasswordRoute } from 'pages/users/change-password';

import { AuthProvider } from './providers';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main className="container my-6">
          <Routes>
            <Route path="cabinet" element={<CabinateRoute />} />
            <Route path="candidates">
              <Route path="new" element={<NewCandidateRoute />} />
            </Route>
            <Route path="users">
              <Route path="generate-hash" element={<ChangePasswordRoute />} />
            </Route>
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
