"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth"; // Ensures you get your augmented Session type
import type { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
  session?: Session | null; // The session can be passed from a Server Component
}

export default function AuthProvider({ children, session }: AuthProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}