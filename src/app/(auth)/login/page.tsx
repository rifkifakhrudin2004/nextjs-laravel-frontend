import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Selamat Datang
        </h1>
        <p className="mt-2 text-gray-600">
          Silakan login untuk mengakses dashboard
        </p>
      </div>
      <LoginForm />
    </div>
  );
}