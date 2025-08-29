'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { RegisterData } from '@/types/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';

export const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role: 'mahasiswa',
    nim: '',
    nip: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      await register(formData);
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Registrasi</CardTitle>
        <CardDescription>
          Buat akun baru untuk mengakses sistem
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
            label="Nama Lengkap"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Masukkan nama lengkap"
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="contoh@email.com"
            required
          />

          <Input
            label="Nomor Telepon"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="081234567890"
            required
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="dosen">Dosen</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role}</p>
            )}
          </div>

          {formData.role === 'mahasiswa' && (
            <Input
              label="NIM"
              name="nim"
              type="text"
              value={formData.nim}
              onChange={handleChange}
              error={errors.nim}
              placeholder="Masukkan NIM"
              required
            />
          )}

          {(formData.role === 'dosen' || formData.role === 'admin') && (
            <Input
              label="NIP"
              name="nip"
              type="text"
              value={formData.nip}
              onChange={handleChange}
              error={errors.nip}
              placeholder="Masukkan NIP"
              required
            />
          )}

          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Minimal 8 karakter"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-14 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <Input
              label="Konfirmasi Password"
              name="password_confirmation"
              type={showPasswordConfirm ? "text" : "password"}
              value={formData.password_confirmation}
              onChange={handleChange}
              error={errors.password_confirmation}
              placeholder="Ulangi password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute right-3 top-14 -translate-y-1/2 text-gray-500"
            >
              {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={loading}
          >
            Daftar
          </Button>

          <div className="text-center text-sm">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login di sini
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};