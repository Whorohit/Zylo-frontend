import React, { useState } from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore } from '../store/useAuthStore';
import { useAuth0 } from '@auth0/auth0-react';
import { X, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { login, register } = useAuthStore();
  const { loginWithRedirect } = useAuth0();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      login(formData);
    } else {
      register(formData);
    }
    onClose();
  };

  const handleSocialLogin = async (provider) => {
    try {
      await loginWithRedirect({
        connection: provider
      });
      onClose();
    } catch (error) {
      console.error('Social login error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputWrapperClass = `relative ${isDarkMode ? 'text-white' : 'text-gray-900'}`;
  const inputClass = `w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
    isDarkMode 
      ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white placeholder-gray-500' 
      : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900 placeholder-gray-400'
  } focus:outline-none focus:ring-0`;
  const iconClass = `absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
    isDarkMode ? 'text-gray-500' : 'text-gray-400'
  }`;
  const buttonClass = `w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-all duration-200`;

  return (
    <div className="fixed inset-0 h-screen w-full z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm bg-black/50" onClick={onClose} />
      <div className={`relative w-full max-w-md p-8 rounded-2xl shadow-2xl transform transition-all duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-xl">
          <User className="w-12 h-12 text-white" strokeWidth={1.5} />
        </div>

        <button
          onClick={onClose}
          className={`absolute right-4 top-4 p-2 rounded-full transition-colors ${
            isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mt-8 mb-8 text-center">
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {mode === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Join our community of digital art collectors'}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => handleSocialLogin('google-oauth2')}
            className={`${buttonClass} ${
              isDarkMode 
                ? 'bg-white/10 hover:bg-white/20 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Chrome className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => handleSocialLogin('github')}
            className={`${buttonClass} ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            }`}
          >
            <Github className="w-5 h-5" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${
              isDarkMode ? 'border-gray-800' : 'border-gray-200'
            }`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${
              isDarkMode ? 'bg-gray-900 text-gray-500' : 'bg-white text-gray-500'
            }`}>Or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className={inputWrapperClass}>
              <User className={iconClass} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          )}
          
          <div className={inputWrapperClass}>
            <Mail className={iconClass} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div className={inputWrapperClass}>
            <Lock className={iconClass} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl text-white font-medium text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700' 
                : 'bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600'
            } shadow-lg hover:shadow-xl`}
          >
            <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className={`mt-6 pt-6 text-center border-t ${
          isDarkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className={`font-medium transition-colors ${
                isDarkMode ? 'text-sky-400 hover:text-sky-300' : 'text-sky-500 hover:text-sky-600'
              }`}
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};