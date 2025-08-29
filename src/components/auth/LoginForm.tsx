'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoginCredentials } from '@/types/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginCredentials>({
    login: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await login(formData);
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: 'Login failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Masuk dengan email/telepon dan password Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {errors.general}
            </div>
          )}
          
          <Input
            label="Email atau Telepon"
            name="login"
            type="text"
            value={formData.login}
            onChange={handleChange}
            error={errors.login}
            placeholder="contoh@email.com atau 081234567890"
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Masukkan password"
            required
          />

          <Button
            type="submit"
            className="w-full"
            loading={loading}
          >
            Login
          </Button>

          <div className="text-center text-sm">
            Belum punya akun?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Daftar di sini
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};