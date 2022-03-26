import React from 'react';
import { Navbar } from 'shared/components/organisms';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import { CabinateRoute } from 'shared/components/pages/cabinet';
import { NewCandidateRoute } from 'shared/components/pages/candidates/new';
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
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
