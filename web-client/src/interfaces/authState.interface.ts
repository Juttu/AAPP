export interface IAuthState {
  isLoggedIn: boolean;
  isRegistered: boolean;
  token?: string | null;
}