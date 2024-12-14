import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Palette, ArrowRight } from 'lucide-react';

export const HeroActions = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up delay-200">
      <Link 
        to="/explore" 
        className="group relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transform hover:-translate-y-0.5"
      >
        <Sparkles className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
        <span>Explore Collection</span>
        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
      </Link>
      <Link 
        to="/create" 
        className="group relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white rounded-xl font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/20 border border-sky-400/30 hover:border-sky-400/50 transform hover:-translate-y-0.5"
      >
        <Palette className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
        <span>Create NFT</span>
      </Link>
    </div>
  );
};