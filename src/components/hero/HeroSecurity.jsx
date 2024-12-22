import React from 'react';
import { Shield, Lock, CheckCircle } from 'lucide-react';

export const HeroSecurity = () => {
  const features = [
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Every transaction is secured and verified by blockchain technology'
    },
    {
      icon: Lock,
      title: 'Smart Contracts',
      description: 'Automated and secure transactions through Ethereum smart contracts'
    },
    {
      icon: CheckCircle,
      title: 'Verified Authentication',
      description: 'All NFTs are authenticated and ownership is permanently recorded'
    }
  ];

  return (
    <div className="mt-12 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 animate-fade-in-up delay-400">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index}
              className="flex items-start space-x-6 p-4 rounded-xl transition-colors hover:bg-white/5"
            >
              <div className="flex-shrink-0">
                <div className="p-3 rounded-xl bg-sky-400/10 border border-sky-400/20">
                  <Icon className="w-6 h-6 text-sky-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-sky-100/80">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};