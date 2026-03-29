export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "customer";
  avatar?: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  user?: Omit<IUser, "password">;
}

export interface IAuthState {
  user: IUser | null;
  isLoggedIn: boolean;
  setUser: (user: IUser | null) => void;
  logOut: () => void;
}
