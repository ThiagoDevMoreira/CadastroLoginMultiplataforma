import { InjectionToken } from '@angular/core';
import { AuthApiPort } from '../auth/ports/auth-api.port';
import { KvStorePort } from '../storage/ports/kv-store.port';
import { CryptoPort } from '../crypto/ports/crypto.port';

export const AUTH_API = new InjectionToken<AuthApiPort>('AUTH_API');
export const KV_STORE = new InjectionToken<KvStorePort>('KV_STORE');
export const CRYPTO = new InjectionToken<CryptoPort>('CRYPTO');
