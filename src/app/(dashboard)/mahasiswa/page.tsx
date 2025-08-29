'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function MahasiswaDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'mahasiswa') {
      router.push('/');
    }
  }, [user, router]);

  if (!user || user.role !== 'mahasiswa') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Selamat Datang di Halaman Mahasiswa! 🎓
        </h1>
        <p className="text-purple-100">
          Halo <span className="font-semibold">{user.name}</span>, Anda login sebagai Mahasiswa
        </p>
        <p className="text-sm text-purple-200 mt-1">
          {user.nim && `NIM: ${user.nim}`} • {user.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">IPK</CardTitle>
            <CardDescription>Indeks Prestasi Kumulatif</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">3.75</div>
            <p className="text-sm text-gray-500 mt-1">Semester 6</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">SKS Diambil</CardTitle>
            <CardDescription>Semester ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">24</div>
            <p className="text-sm text-gray-500 mt-1">dari 24 SKS max</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mata Kuliah</CardTitle>
            <CardDescription>Sedang diambil</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">8</div>
            <p className="text-sm text-gray-500 mt-1">Mata kuliah aktif</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Jadwal Kuliah Hari Ini</CardTitle>
            <CardDescription>
              Jadwal perkuliahan untuk hari ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                <div>
                  <p className="font-medium">Kalkulus II</p>
                  <p className="text-sm text-gray-500">Ruang B.201 • Dr. Sari</p>
                </div>
                <span className="text-sm font-medium text-blue-600">08:00 - 10:00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                <div>
                  <p className="font-medium">Pemrograman Web</p>
                  <p className="text-sm text-gray-500">Lab Komputer 1 • Pak Ahmad</p>
                </div>
                <span className="text-sm font-medium text-green-600">10:30 - 12:30</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-md">
                <div>
                  <p className="font-medium">Basis Data</p>
                  <p className="text-sm text-gray-500">Ruang A.105 • Bu Diana</p>
                </div>
                <span className="text-sm font-medium text-purple-600">13:30 - 15:30</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tugas & Deadline</CardTitle>
            <CardDescription>
              Tugas yang harus dikumpulkan segera
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-md">
                <div>
                  <p className="font-medium">Project Database</p>
                  <p className="text-sm text-gray-500">Basis Data</p>
                </div>
                <span className="text-sm font-medium text-red-600">2 hari lagi</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-md">
                <div>
                  <p className="font-medium">Tugas Web Development</p>
                  <p className="text-sm text-gray-500">Pemrograman Web</p>
                </div>
                <span className="text-sm font-medium text-yellow-600">5 hari lagi</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                <div>
                  <p className="font-medium">Latihan Soal Kalkulus</p>
                  <p className="text-sm text-gray-500">Kalkulus II</p>
                </div>
                <span className="text-sm font-medium text-blue-600">1 minggu lagi</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pengumuman Terbaru</CardTitle>
          <CardDescription>
            Informasi penting dari kampus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-medium">Registrasi Semester Genap 2024/2025</p>
              <p className="text-sm text-gray-600 mt-1">
                Registrasi dibuka mulai 15 Januari 2025. Jangan lupa untuk melakukan pembayaran UKT terlebih dahulu.
              </p>
              <p className="text-xs text-gray-400 mt-2">2 hari yang lalu</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-medium">Beasiswa PPA 2025</p>
              <p className="text-sm text-gray-600 mt-1">
                Pendaftaran beasiswa PPA dibuka untuk mahasiswa berprestasi dengan IPK minimal 3.25.
              </p>
              <p className="text-xs text-gray-400 mt-2">5 hari yang lalu</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}