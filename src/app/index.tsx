import React from 'react';
import { Navbar } from 'components/organisms/Navbar';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
