import { z } from 'zod';

export const urlSchema = z.object({
  body: z.object({
    originalUrl: z.string().min(1, { message: 'Long URL is required' }).url({ message: 'Invalid URL' }),
  }),
});

export const urlCodeSchema = z.object({
  params: z.object({
    urlCode: z.string().min(5, { message: 'URL Code must be at least 5 characters' }).max(10),
  }),
});

export type UrlInput = z.infer<typeof urlSchema>;
export type UrlCodeInput = z.infer<typeof urlCodeSchema>;
