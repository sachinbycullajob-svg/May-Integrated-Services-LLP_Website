import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { Lock, X, ArrowRight } from 'lucide-react';

interface PasswordProtectedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  themeMode: ThemeMode;
  title: string;
}

export const PasswordProtectedModal: React.FC<PasswordProtectedModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  themeMode,
  title
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'A9r2H6e@16$') {
      setError('');
      setPassword('');
      onSuccess();
    } else {
      setError('Incorrect password. Access denied.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
      <div className={`w-full max-w-md p-6 sm:p-8 rounded-xl border relative shadow-2xl ${
        themeMode === 'dark' ? 'bg-maroon-950 border-maroon-800 text-beige-100' : 'bg-beige-50 border-beige-300 text-maroon-900'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
            themeMode === 'dark' ? 'bg-maroon-900 border border-maroon-800 text-beige-200' : 'bg-beige-100 border border-beige-300 text-gray-600'
          }`}>
            <Lock className="w-5 h-5" />
          </div>
          <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-maroon-950'
          }`}>
            Secure Access
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Please enter the password to access {title}.
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter credentials to continue..."
              className={`w-full px-4 py-3 rounded-md border text-sm focus:outline-none transition-colors ${
                themeMode === 'dark' 
                  ? 'bg-maroon-900 border-maroon-800 focus:border-gray-500 text-white placeholder:text-gray-500' 
                  : 'bg-beige-50 border-beige-300 focus:border-gray-400 text-maroon-950 placeholder:text-gray-400'
              }`}
              autoFocus
            />
          </div>
          
          {error && (
            <p className="text-xs font-semibold text-red-500 text-center animate-in fade-in slide-in-from-top-1">
              {error}
            </p>
          )}

          <button
            type="submit"
            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-semibold transition-colors duration-200 ${
              themeMode === 'dark' ? 'bg-beige-200 hover:bg-beige-50 text-maroon-950' : 'bg-gray-900 hover:bg-black text-white'
            }`}
          >
            <span>Verify & Proceed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
