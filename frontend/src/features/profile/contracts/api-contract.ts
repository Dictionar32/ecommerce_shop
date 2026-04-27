/**
 * Profile API Contract - Zod schemas with types
 */
import { Update } from 'next/dist/build/swc/types';
import { z } from 'zod'
export namespace ProfileApiContract {

export const Schema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Nama harus diisi'),
  email: z.string().email('Email tidak valid'),
});

export const IndexSchema = z.array(Schema);

export const UpdateSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi').optional(),
  email: z.string().email('Email tidak valid').optional(),
});

export type Response = z.infer<typeof Schema>
export type Index = z.infer<typeof IndexSchema>
export type Update = z.infer<typeof UpdateSchema>

export const ValidateSchema = (payload: unknown): Response => Schema.parse(payload)
export const ValidateUpdate = (payload: unknown): Update => UpdateSchema.parse(payload)
export const validateIndex = (payload: unknown): Index => IndexSchema.parse(payload)
}