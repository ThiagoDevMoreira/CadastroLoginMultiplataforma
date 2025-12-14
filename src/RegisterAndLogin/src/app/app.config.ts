import { AUTH_API, KV_STORE, CRYPTO } from 'projects/ral-app/src/public-api';
import { AuthApiMockService } from 'projects/ral-infra/src/lib/auth/auth-api-mock.service';
import { IndexeddbStoreService } from 'projects/ral-infra/src/lib/storage/indexeddb-store.service';
import { CryptoService } from 'projects/ral-infra/src/lib/crypto/crypto.service';

providers: [
  { provide: AUTH_API, useExisting: AuthApiMockService },
  { provide: KV_STORE, useExisting: IndexeddbStoreService },
  { provide: CRYPTO, useExisting: CryptoService },
]
