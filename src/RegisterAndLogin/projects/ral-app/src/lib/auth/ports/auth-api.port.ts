export interface AuthApiPort {
  login(encryptedLoginDto: string): Promise<string>;     // retorna encryptedLoginResultDto
  register(encryptedRegisterDto: string): Promise<string>; // retorna encryptedRegisterResultDto
}
