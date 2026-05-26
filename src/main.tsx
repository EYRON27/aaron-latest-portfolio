import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import MacOSView from './pages/MacOSView.tsx';
import WindowsView from './pages/WindowsView.tsx';
import PageTransition from './components/PageTransition.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PageTransition>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/macos" element={<MacOSView />} />
          <Route path="/windows" element={<WindowsView />} />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  </StrictMode>
);
