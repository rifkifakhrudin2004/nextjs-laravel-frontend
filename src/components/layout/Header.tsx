'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { getUserDisplayName, getUserIdentifier } from '@/lib/utils';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Dashboard {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </h1>
        </div>
        
        {/* <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {getUserDisplayName(user)}
            </p>
            <p className="text-xs text-gray-500">
              {getUserIdentifier(user)}
            </p>
          </div>
        </div> */}
      </div>
    </header>
  );
};