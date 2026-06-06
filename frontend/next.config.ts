import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      react: "./node_modules/react",
      "react-dom": "./node_modules/react-dom",
      "@tanstack/react-query": "./node_modules/@tanstack/react-query",
    },
  },
};

export default nextConfig;
