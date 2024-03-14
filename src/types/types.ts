import type { Request } from 'express';
export interface HttpError extends Error {
  statusCode?: number;
}

export interface AuthenticatedRequest extends Request {
  auth: string;
}
