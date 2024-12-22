import React from 'react';
import { Zap } from 'lucide-react';
import { HeroBackground } from './hero/HeroBackground';
import { HeroActions } from './hero/HeroActions';
import { HeroStats } from './hero/HeroStats';
import { HeroSecurity } from './hero/HeroSecurity';

export const HeroSection = () => {
  return (
    <div className="relative min-h-[70vh] mb-12 overflow-hidden">
      <HeroBackground />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-20">
        <div className="flex flex-col justify-center h-full">
          <div className="max-w-6xl">
            <div className="inline-flex items-center space-x-2 px-4 py-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in">
              <Zap className="w-5 h-5 text-sky-400" />
              <span className="text-base sm:text-lg font-medium bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
              Welcome to Zylo Digital Assets Marketplace
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight tracking-tight animate-fade-in-up">
              <span className="text-white">Discover & Collect</span>
              <br />
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Extraordinary Digital Assets
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-sky-100 mb-8 leading-relaxed max-w-2xl animate-fade-in-up delay-100">
            Join the future of digital ownership. Create, sell, and collect unique digital assets, including NFTs, on the most innovative and secure blockchain-powered marketplace.
            </p>

            <HeroActions />
            {/* <HeroStats /> */}
            <HeroSecurity />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sky-900/50 to-transparent pointer-events-none" />
    </div>
  );
};