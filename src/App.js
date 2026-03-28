import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing   from './pages/Landing';
import Browse    from './pages/Browse';
import Explore   from './pages/Explore';
import Creators  from './pages/Creators';
import Events    from './pages/Events';
import Pricing   from './pages/Pricing';
import Login     from './pages/Login';
import Signup    from './pages/Signup';
import PlanPage  from './pages/PlanPage';
import Dashboard from './pages/Dashboard';
import Upload    from './pages/Upload';
import Admin     from './pages/Admin';
import Checkout  from './pages/Checkout';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Landing />} />
        <Route path="/browse"     element={<Browse />} />
        <Route path="/explore"    element={<Explore />} />
        <Route path="/creators"   element={<Creators />} />
        <Route path="/events"     element={<Events />} />
        <Route path="/pricing"    element={<Pricing />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/signup"     element={<Signup />} />
        <Route path="/plan/:slug" element={<PlanPage />} />
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/upload"     element={<Upload />} />
        <Route path="/admin"      element={<Admin />} />
        <Route path="/checkout"   element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}