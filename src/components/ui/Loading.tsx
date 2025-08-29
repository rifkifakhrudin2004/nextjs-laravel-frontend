"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  message: string;
}

// Loading Context
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Custom hook to use loading
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

// Loading Provider Component
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Loading...');

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const showLoading = (msg = 'Loading...') => {
    setMessage(msg);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading,
        showLoading,
        hideLoading,
        message,
      }}
    >
      {children}
      {isLoading && <GlobalLoading message={message} />}
    </LoadingContext.Provider>
  );
};

// Spinner Component
const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
    </div>
  );
};

// Pulse Animation Component
const PulseLoader: React.FC = () => {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1.4s'
          }}
        ></div>
      ))}
    </div>
  );
};

// Skeleton Loader Component
export const SkeletonLoader: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-200 rounded mb-3 last:mb-0"
          style={{
            width: `${Math.random() * 40 + 60}%`
          }}
        ></div>
      ))}
    </div>
  );
};

// Main Global Loading Component
const GlobalLoading: React.FC<{ message: string }> = ({ message }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999] transition-all duration-300">
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center space-y-6 max-w-sm mx-4 transform transition-all duration-300 scale-100">
        {/* Main Spinner */}
        <div className="relative">
          <Spinner size="lg" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-ping"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {message}
            <span className="text-blue-500">{dots}</span>
          </h3>
          <PulseLoader />
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// Button Loading Component
export const LoadingButton: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ isLoading, children, onClick, className = '', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        relative px-6 py-3 rounded-lg font-medium transition-all duration-200
        ${isLoading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-500 hover:bg-blue-600 active:transform active:scale-95'
        }
        text-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
        ${className}
      `}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="sm" />
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

// Card Loading Component
export const LoadingCard: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="animate-pulse">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <SkeletonLoader lines={4} />
      </div>
    </div>
  );
};

// Demo Component to show usage
const LoadingDemo: React.FC = () => {
  const { showLoading, hideLoading } = useLoading();
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleGlobalLoading = () => {
    showLoading('Memuat data...');
    setTimeout(() => {
      hideLoading();
    }, 3000);
  };

  const handleButtonLoading = async () => {
    setButtonLoading(true);
    // Simulate API call
    setTimeout(() => {
      setButtonLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Global Loading Component Demo
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Global Loading Demo */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Global Loading</h2>
            <p className="text-gray-600 mb-4">
              Klik tombol untuk menampilkan loading global yang akan mengcover seluruh layar.
            </p>
            <button
              onClick={handleGlobalLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Show Global Loading
            </button>
          </div>

          {/* Button Loading Demo */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Button Loading</h2>
            <p className="text-gray-600 mb-4">
              Tombol dengan state loading yang menampilkan spinner.
            </p>
            <LoadingButton
              isLoading={buttonLoading}
              onClick={handleButtonLoading}
              className="w-full"
            >
              {buttonLoading ? 'Processing...' : 'Click Me'}
            </LoadingButton>
          </div>

          {/* Skeleton Loader Demo */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Skeleton Loader</h2>
            <SkeletonLoader lines={5} />
          </div>

          {/* Loading Card Demo */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Loading Card</h2>
            <LoadingCard />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component with Provider
export default function App() {
  return (
    <LoadingProvider>
      <LoadingDemo />
    </LoadingProvider>
  );
}