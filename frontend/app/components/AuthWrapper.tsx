"use client";

import { AuthProvider } from '../contexts/AuthContext';

export default function AuthWrapper({ children }: { readonly children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}