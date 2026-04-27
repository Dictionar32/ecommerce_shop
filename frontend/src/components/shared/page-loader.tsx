"use client";

import { Loader2 } from "lucide-react";

interface PageLoaderProps {
  text?: string;
}

export function PageLoader({ text = "Memuat..." }: PageLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 py-12">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  );
}

export default PageLoader;
