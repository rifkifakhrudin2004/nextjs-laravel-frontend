import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "@/types/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserDisplayName = (user: User): string => {
  return user.name;
};

export const getUserIdentifier = (user: User): string => {
  if (user.role === 'mahasiswa' && user.nim) {
    return `NIM: ${user.nim}`;
  }
  if ((user.role === 'admin' || user.role === 'dosen') && user.nip) {
    return `NIP: ${user.nip}`;
  }
  return user.email;
};