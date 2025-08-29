'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { userService } from '@/services/userService';
import { User } from '@/types/auth';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await userService.getUsers();
        if (response.success && response.data) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Selamat Datang di Halaman Admin! 👋
        </h1>
        <p className="text-blue-100">
          Halo <span className="font-semibold">{user.name}</span>, Anda login sebagai Administrator
        </p>
        <p className="text-sm text-blue-200 mt-1">
          {user.nip && `NIP: ${user.nip}`} • {user.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Users</CardTitle>
            <CardDescription>Jumlah semua pengguna</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {loading ? '...' : users.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mahasiswa</CardTitle>
            <CardDescription>Jumlah mahasiswa aktif</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {loading ? '...' : users.filter(u => u.role === 'mahasiswa').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Dosen</CardTitle>
            <CardDescription>Jumlah dosen aktif</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {loading ? '...' : users.filter(u => u.role === 'dosen').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>
            Ringkasan aktivitas sistem terbaru
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm">Sistem berjalan normal</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm">Database terhubung</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm">
                {users.length} pengguna terdaftar dalam sistem
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}