'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronRight, BookOpen, Users, Award, Menu, X } from 'lucide-react';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      // Redirect authenticated users to their dashboard
      switch (user.role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'dosen':
          router.push('/dosen');
          break;
        case 'mahasiswa':
          router.push('/mahasiswa');
          break;
        default:
          router.push('/');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return null; // Will be redirected by useEffect
  }

  const handleLogin = () => {
    router.push('/login');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">EduSystem</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </a>
              <button
                onClick={handleLogin}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors px-4 py-2">
                  Features
                </a>
                <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors px-4 py-2">
                  About
                </a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors px-4 py-2">
                  Contact
                </a>
                <div className="flex flex-col space-y-2 px-4">
                  <button
                    onClick={handleLogin}
                    className="text-blue-600 hover:text-blue-700 font-medium py-2 text-left transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleRegister}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                🎓 Modern Education Management System
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Revolutionize Your
                <span className="text-blue-600 block">Education Experience</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Streamline academic processes, enhance learning outcomes, and connect students, teachers, and administrators in one powerful platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleRegister}
                className="group bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center font-semibold text-lg"
              >
                Start Your Journey
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleLogin}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-200 font-semibold text-lg"
              >
                Sign In
              </button>
            </div>

            {/* Hero Image/Illustration Placeholder */}
            <div className="relative mx-auto max-w-4xl">
              <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl shadow-2xl h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                <div className="text-white text-center">
                  <BookOpen className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4 opacity-80" />
                  <p className="text-lg sm:text-xl opacity-90">Your Educational Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Modern Education
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed for students, teachers, and administrators to succeed together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="bg-blue-600 text-white p-3 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Student Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive student profiles, enrollment tracking, and academic progress monitoring in one centralized system.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200">
              <div className="bg-green-600 text-white p-3 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Create, organize, and manage courses with ease. Track assignments, grades, and student participation effortlessly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-200">
              <div className="bg-purple-600 text-white p-3 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics & Reports</h3>
              <p className="text-gray-600 leading-relaxed">
                Detailed insights and analytics to track performance, identify trends, and make data-driven decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Education?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of institutions already using our platform to enhance their educational experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRegister}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 font-semibold text-lg shadow-lg"
            >
              Get Started Free
            </button>
            <button
              onClick={handleLogin}
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200 font-semibold text-lg"
            >
              Sign In Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">EduSystem</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 EduSystem. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}