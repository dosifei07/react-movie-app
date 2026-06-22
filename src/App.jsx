import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <BrowserRouter>
      <header style={{ 
        padding: '20px 40px', 
        background: '#1f1f1f', 
        display: 'flex', 
        gap: '20px',
        borderBottom: '1px solid #333'
      }}>
        <Link to="/" style={{ color: '#e50914', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px' }}>
          NETFLIX
        </Link>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none'}}>
          Home
        </Link>
      </header>

      <main style={{ 
        padding: '40px', 
        background: '#141414', 
        color: '#fff', 
        minHeight: 'calc(100vh - 71px)' 
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;