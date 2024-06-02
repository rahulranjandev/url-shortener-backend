import { z } from 'zod';

export const urlSchema = z.object({
  body: z.object({
    longUrl: z.string({ required_error: 'Long URL is required' }).url({ message: 'Invalid URL' }),
  }),
});

export const urlCodeSchema = z.object({
  params: z.object({
    urlCode: z.string({ required_error: 'URL Code is required' }).min(5).max(10),
  }),
});

export type UrlInput = z.infer<typeof urlSchema>;
export type UrlCodeInput = z.infer<typeof urlCodeSchema>;
