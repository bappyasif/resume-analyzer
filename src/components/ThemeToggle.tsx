"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 border rounded-full px-4 pl-6 shadow-sm bg-secondary/10 backdrop-blur-md border-prbg-secondary/20 hover:bg-secondary/15 transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      Toggle {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
