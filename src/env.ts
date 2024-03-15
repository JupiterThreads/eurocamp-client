import { z } from 'zod';

const envSchema = z.object({
  EUROCAMP_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
});

export const parsedEnv = envSchema.parse(process.env);
