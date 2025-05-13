import React, { useState } from 'react';
import { useThemeStore } from '../store/useThemeStore';

// import { useLoginMutation, useRegisterMutation } from '../store/authapi';
import { ethers } from 'ethers';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import metamasklogo from '../assets/metamask.png';
import { loginUser, metaMaskLogin, registerUser } from '../store/authslice';
import { useDispatch } from 'react-redux';
export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  // const [login] = useLoginMutation();
  // const [register] = useRegisterMutation();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleMetaMaskLogin = async () => {

    try {
      
      
      await dispatch(metaMaskLogin()).unwrap();
      onClose();
    } catch (error) {
      console.error('MetaMask login failed:', error);
      
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        const response = await dispatch(loginUser({ email: formData.email, password: formData.password })).unwrap();
        localStorage.setItem('token', response.token);
      } else {
        await dispatch(registerUser(formData)).unwrap();
        
       
      }
      onClose();
    } catch (error) {
      console.error('Authentication failed:', error);
      
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 h-screen w-full z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm bg-black/50" onClick={onClose} />
      <div className={`relative w-full max-w-md p-8 rounded-2xl shadow-2xl transition-all ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        
        <button onClick={onClose} className={`absolute right-4 top-4 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
          <X className="w-5 h-5" />
        </button>

        <div className="mt-8 mb-8 text-center">
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {mode === 'login' ? 'Sign in with MetaMask or Email/Password' : 'Join our digital asset marketplace'}
          </p>
        </div>

        {mode === 'login' && (
          <div className="space-y-4 mb-6">
            <button onClick={handleMetaMaskLogin} className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-all duration-200 ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
              <img src={metamasklogo} alt="MetaMask" className="w-5 h-5" />
              <span>Continue with MetaMask</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="relative text-gray-900">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2"
                required
              />
            </div>
          )}

          <div className="relative text-gray-900">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2"
              required
            />
          </div>

          <div className="relative text-gray-900">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2"
              required
            />
          </div>

          <button type="submit" className="w-full flex justify-center items-center py-3 rounded-xl text-white font-medium text-lg bg-gradient-to-r from-sky-400 to-blue-500">
            <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-6 pt-6 text-center">
          <p>
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-sky-500">
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};