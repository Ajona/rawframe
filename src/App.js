import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}

export default App;