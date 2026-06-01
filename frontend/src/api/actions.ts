// Auto-generated Next.js Server Actions. Do not edit manually.
"use server";

import { api } from './api'
import { cookies } from 'next/headers'

// Helper to auto-inject token from cookies if available
async function getAuthHeaders(): Promise<Record<string, string> | undefined> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  return token ? { Authorization: `Bearer ${token}` } : undefined
}
