export interface MeResponse {
  id: number;
  loginId: string;
  fullname: string;
  gender: string;
  ageRange: string;
  phone: string;
  email: string;
  roles: string[];
  provider: 'LOCAL' | string;
  createdAt: string;
  completeProfile: boolean;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: MeResponse | null;

  // actions
  init: () => Promise<void>;
  setUser: (user: MeResponse | null) => void;
  loginWithCredentials: (loginId: string, password: string) => Promise<void>;
  fetchMe: () => Promise<MeResponse>;
  logout: () => Promise<void>;
}
