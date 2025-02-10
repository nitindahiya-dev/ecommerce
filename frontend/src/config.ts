const isProduction = process.env.NODE_ENV === 'production';

export const baseURL = isProduction
  ? process.env.NEXT_PUBLIC_BACKEND_PROD
  : process.env.NEXT_PUBLIC_BACKEND_DEV;

export const apiURL = process.env.NEXT_PUBLIC_API_URL;