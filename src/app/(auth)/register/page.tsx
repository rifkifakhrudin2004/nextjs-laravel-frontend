import React from 'react';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Buat Akun Baru
        </h1>
        <p className="mt-2 text-gray-600">
          Daftarkan diri Anda untuk mengakses sistem
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}