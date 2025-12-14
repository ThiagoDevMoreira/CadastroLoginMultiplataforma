export interface Session {
  accessToken: string;
  user: { id: string; email: string };
}
