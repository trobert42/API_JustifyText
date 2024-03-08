export interface AuthenticatedRequest extends Request {
  auth?: string;
}

export interface HttpError extends Error {
  statusCode?: number;
}
