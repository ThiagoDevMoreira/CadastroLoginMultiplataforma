import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AUTH_API, CRYPTO, KV_STORE } from '../../di/tokens';
import { AuthApiPort } from '../ports/auth-api.port';
import { KvStorePort } from '../../storage/ports/kv-store.port';
import { CryptoPort } from '../../crypto/ports/crypto.port';

import { LoginDto } from '../dtos/login.dto';
import { LoginResultDto } from '../dtos/login-result.dto';
import { RegisterDto } from '../dtos/register.dto';
import { RegisterResultDto } from '../dtos/register-result.dto';
import { Session } from '../models/session.model';

@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
  private readonly SESSION_KEY = 'session';
  private sessionSubject = new BehaviorSubject<Session | null>(null);

  session$ = this.sessionSubject.asObservable();

  constructor(
    @Inject(AUTH_API) private authApi: AuthApiPort,
    @Inject(KV_STORE) private store: KvStorePort,
    @Inject(CRYPTO) private crypto: CryptoPort
  ) {}

  async init(): Promise<void> {
    const saved = await this.store.get<Session>(this.SESSION_KEY);
    this.sessionSubject.next(saved ?? null);
  }

  async register(dto: RegisterDto): Promise<RegisterResultDto> {
    const encrypted = await this.crypto.encryptJson(dto);
    const encryptedResult = await this.authApi.register(encrypted);
    return this.crypto.decryptJson<RegisterResultDto>(encryptedResult);
  }

  async login(dto: LoginDto): Promise<Session> {
    const encrypted = await this.crypto.encryptJson(dto);
    const encryptedResult = await this.authApi.login(encrypted);
    const result = await this.crypto.decryptJson<LoginResultDto>(encryptedResult);

    const session: Session = { accessToken: result.accessToken, user: result.user };
    await this.store.set(this.SESSION_KEY, session);
    this.sessionSubject.next(session);
    return session;
  }

  async logout(): Promise<void> {
    await this.store.remove(this.SESSION_KEY);
    this.sessionSubject.next(null);
  }
}
