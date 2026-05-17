import { z } from 'zod';

export const authSchema = z.object({
    email: z.email('Invalid email'),
    password: z
        .string('Password is required')
        .min(6, { message: 'Password is too short' })
        .max(256, { message: 'Password is too long' }),
});

export type AuthFormType = z.infer<typeof authSchema>;
