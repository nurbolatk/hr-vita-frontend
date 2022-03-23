import React from 'react';
import { Navbar } from 'components/organisms';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import { CabinateRoute } from 'components/pages/cabinet';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container my-6">
        <Routes>
          <Route path="/cabinet" element={<CabinateRoute />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
