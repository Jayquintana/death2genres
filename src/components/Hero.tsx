import React from 'react';
import { ArrowDown } from 'lucide-react';

const AnimatedTitle = () => (
  <h1 className="text-5xl md:text-8xl font-metal mb-6 animated-title">
    {'DEATH 2 GENRES'.split('').map((char, i) => (
      <span key={i} className="text-[#f5f5f1]">{char === ' ' ? '\u00A0' : char}</span>
    ))}
  </h1>
);

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="animated-bg"></div>
      <div className="relative z-10 text-center px-4">
        <AnimatedTitle />
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-[#f5f5f1] font-bold">
          Celebrating artists who break boundaries and redefine music
        </p>
        <a href="#about" className="inline-flex items-center animate-bounce">
          <ArrowDown className="w-6 h-6 text-[#f5f5f1]" />
        </a>
      </div>
    </section>
  );
};

export default Hero;