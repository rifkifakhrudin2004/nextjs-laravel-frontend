'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  Home, 
  Users, 
  BookOpen, 
  GraduationCap,
  Settings,
  LogOut 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const adminMenus = [
    { href: '/admin', label: 'Dashboard Admin', icon: Home },
    { href: '/admin/users', label: 'Kelola User', icon: Users },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const dosenMenus = [
    { href: '/dosen', label: 'Dashboard Dosen', icon: Home },
    { href: '/dosen/courses', label: 'Mata Kuliah', icon: BookOpen },
    { href: '/dosen/students', label: 'Mahasiswa', icon: GraduationCap },
  ];

  const mahasiswaMenus = [
    { href: '/mahasiswa', label: 'Dashboard Mahasiswa', icon: Home },
    { href: '/mahasiswa/courses', label: 'Mata Kuliah Saya', icon: BookOpen },
    { href: '/mahasiswa/grades', label: 'Nilai', icon: GraduationCap },
  ];

  const getMenus = () => {
    if (user.role === 'admin') return adminMenus;
    if (user.role === 'dosen') return dosenMenus;
    if (user.role === 'mahasiswa') return mahasiswaMenus;
    return [];
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">
          {process.env.NEXT_PUBLIC_APP_NAME || 'Sanctum App'}
        </h2>
        <p className="text-sm text-gray-600 capitalize">{user?.role}</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {getMenus().map((menu) => {
          const Icon = menu.icon;
          const isActive = pathname === menu.href;
          
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span>{menu.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-3 px-4 py-2 mb-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">
              {user?.role === 'mahasiswa' ? user?.nim : 
               user?.role === 'dosen' ? user?.nip : 
               user?.email}
            </p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export { Sidebar };