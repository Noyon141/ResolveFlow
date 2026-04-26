export interface RegisterAuthInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthProvider {
  register(input: RegisterAuthInput): Promise<AuthUser>;
}
