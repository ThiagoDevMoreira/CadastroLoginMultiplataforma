export interface LoginResultDto {
  accessToken: string;
  user: { id: string; email: string };
}
