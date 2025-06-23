export interface User {
  id: string;
  username: string;
  email: string;
}

export interface FormDataRegister {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface FormDataLogin {
  email: string;
  password: string;
}

// Context Types

export interface AuthContextType {
  user: User | null;
  token: string;
  error: string | null;
  login: (data: FormDataLogin) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

// Routes Types
export interface ProtectedRoutesTypes {
  token: string;
  redirectPath?: string;
  children: React.ReactNode;
}
