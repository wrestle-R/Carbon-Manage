import React, { useState, useEffect } from 'react';

import TestimonialsSection from '../components/TestimonialsSection';


const Testi = () => {
  const [currentSection, setCurrentSection] = useState('hero');

  const handleHeroComplete = () => {
    setTimeout(() => {
      setCurrentSection('testimonials');
    }, 500);
  };



  return (
    <div className="h-screen w-full overflow-hidden">
    <TestimonialsSection />
    
    </div>
  );
};

export default Testi;