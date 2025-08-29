'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function DosenDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'dosen') {
      router.push('/');
    }
  }, [user, router]);

  if (!user || user.role !== 'dosen') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Selamat Datang di Halaman Dosen! 📚
        </h1>
        <p className="text-green-100">
          Halo <span className="font-semibold">{user.name}</span>, Anda login sebagai Dosen
        </p>
        <p className="text-sm text-green-200 mt-1">
          {user.nip && `NIP: ${user.nip}`} • {user.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mata Kuliah</CardTitle>
            <CardDescription>Mata kuliah yang diampu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">5</div>
            <p className="text-sm text-gray-500 mt-1">Semester ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Mahasiswa</CardTitle>
            <CardDescription>Mahasiswa yang mengikuti kelas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">127</div>
            <p className="text-sm text-gray-500 mt-1">Aktif semester ini</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Jadwal Mengajar Hari Ini</CardTitle>
            <CardDescription>
              Jadwal perkuliahan untuk hari ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">Algoritma & Pemrograman</p>
                  <p className="text-sm text-gray-500">Ruang A.101</p>
                </div>
                <span className="text-sm font-medium text-green-600">08:00 - 10:00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">Struktur Data</p>
                  <p className="text-sm text-gray-500">Lab Komputer 2</p>
                </div>
                <span className="text-sm font-medium text-blue-600">13:00 - 15:00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tugas Perlu Review</CardTitle>
            <CardDescription>
              Tugas mahasiswa yang menunggu penilaian
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-md">
                <div>
                  <p className="font-medium">Project UAS</p>
                  <p className="text-sm text-gray-500">15 submissions</p>
                </div>
                <span className="text-sm font-medium text-yellow-600">Pending</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-md">
                <div>
                  <p className="font-medium">Tugas Minggu 8</p>
                  <p className="text-sm text-gray-500">23 submissions</p>
                </div>
                <span className="text-sm font-medium text-orange-600">Due Soon</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}