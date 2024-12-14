import React from 'react';

export const HeroStats = () => {
  const stats = [
    { value: '50K+', label: 'Digital Assets', icon: '🎨' },
    { value: '30K+', label: 'Artists', icon: '👨‍🎨' },
    { value: '100K+', label: 'Community Members', icon: '🌟' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 animate-fade-in-up delay-300">
      {stats.map((stat, index) => (
        <div key={index} className="relative group cursor-pointer">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400/20 to-blue-400/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
          <div className="relative flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 group-hover:border-sky-400/50 transition-all duration-300">
            <span className="text-2xl mr-3">{stat.icon}</span>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs sm:text-sm text-sky-200">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};