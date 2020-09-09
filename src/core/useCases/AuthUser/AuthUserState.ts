export const ValidationsError = {
  REQUIRED: 'REQUIRED',
  INVALID_EMAIL: 'INVALID_EMAIL',
  BAD_CREDENTIALS: 'BAD_CREDENTIALS',
} as const

export type ValidationsError = keyof typeof ValidationsError

export interface AuthUserState {
  isLogging: boolean;
  user: null | {
    id: string;
    email: string;
    role: 'PATIENT' | 'DOCTOR'
  };
  loginErrors?: {
    email?: ValidationsError;
    password?: ValidationsError;
  }
}
