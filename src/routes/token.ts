import * as jose from 'jose';
import z from 'zod';

import { createUser } from '../db/user';
import { getEnvs } from '../utils/getEnvs';

export const tokenSchema = z.object({
  email: z.string().email(),
});

type Token = z.infer<typeof tokenSchema>;

export const tokenHandler = async (email: Token['email']) => {
  const secret = new TextEncoder().encode(getEnvs().jwtSecret);

  const token = await new jose.SignJWT({ email })
    .setExpirationTime('8h')
    .setProtectedHeader({
      alg: 'HS256',
      typ: 'JWT',
    })
    .sign(secret);

  try {
    return await createUser(email, token);
  } catch (error) {
    return null;
  }
};
