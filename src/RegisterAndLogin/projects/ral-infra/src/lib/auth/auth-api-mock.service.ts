import { Injectable } from '@angular/core';
import { AuthApiPort } from 'projects/ral-app/src/lib/auth/ports/auth-api.port';
import { LoginDto } from 'projects/ral-app/src/lib/auth/dtos/login.dto';
import { LoginResultDto } from 'projects/ral-app/src/lib/auth/dtos/login-result.dto';
import { RegisterDto } from 'projects/ral-app/src/lib/auth/dtos/register.dto';
import { RegisterResultDto } from 'projects/ral-app/src/lib/auth/dtos/register-result.dto';
import { CryptoService } from '../crypto/crypto.service';
import { IndexeddbStoreService } from "../storage/indexeddb-store.service";

type StoredUser = { id: string; email: string; password: string };

@Injectable({ providedIn: 'root' })
export class AuthApiMockService implements AuthApiPort {
  private readonly USERS_KEY = 'users';

  constructor(
    private crypto: CryptoService,
    private store: IndexeddbStoreService
  ) {}

  async register(encryptedRegisterDto: string): Promise<string> {
    const dto = await this.crypto.decryptJson<RegisterDto>(encryptedRegisterDto);

    const users = (await this.store.get<StoredUser[]>(this.USERS_KEY)) ?? [];
    const exists = users.some(u => u.email.toLowerCase() === dto.email.toLowerCase());
    if (exists) throw new Error('E-mail já cadastrado');

    const user: StoredUser = { id: crypto.randomUUID(), email: dto.email, password: dto.password };
    users.push(user);
    await this.store.set(this.USERS_KEY, users);

    const result: RegisterResultDto = { user: { id: user.id, email: user.email } };
    return this.crypto.encryptJson(result);
  }

  async login(encryptedLoginDto: string): Promise<string> {
    const dto = await this.crypto.decryptJson<LoginDto>(encryptedLoginDto);

    const users = (await this.store.get<StoredUser[]>(this.USERS_KEY)) ?? [];
    const user = users.find(u => u.email.toLowerCase() === dto.email.toLowerCase());

    if (!user || user.password !== dto.password) throw new Error('Credenciais inválidas');

    const result: LoginResultDto = {
      accessToken: `mock.${crypto.randomUUID()}.token`,
      user: { id: user.id, email: user.email },
    };

    return this.crypto.encryptJson(result);
  }
}
