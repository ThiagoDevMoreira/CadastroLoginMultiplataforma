import { Injectable } from '@angular/core';
import { openDB, DBSchema } from 'idb';
import { KvStorePort } from 'projects/ral-app/src/lib/storage/ports/kv-store.port';

interface RalDb extends DBSchema {
  kv: {
    key: string;
    value: unknown;
  };
}

@Injectable({ providedIn: 'root' })
export class IndexeddbStoreService implements KvStorePort {
  private dbPromise = openDB<RalDb>('ral-db', 1, {
    upgrade(db) {
      db.createObjectStore('kv');
    },
  });

  async get<T>(key: string): Promise<T | null> {
    const db = await this.dbPromise;
    const v = await db.get('kv', key);
    return (v as T) ?? null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    const db = await this.dbPromise;
    await db.put('kv', value, key);
  }

  async remove(key: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('kv', key);
  }
}
