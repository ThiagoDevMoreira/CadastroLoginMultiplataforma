import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CryptoService {
  // OBS: para demo/mock. Em projeto real, a gestão de chaves precisa ser desenhada com mais cuidado.
  private readonly passphrase = 'ral-demo-key'; // demo
  private readonly salt = 'ral-demo-salt';      // demo

  async encryptJson(obj: unknown): Promise<string> {
    const data = new TextEncoder().encode(JSON.stringify(obj));
    const key = await this.deriveKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);

    return `${this.b64(iv)}.${this.b64(new Uint8Array(ciphertext))}`;
  }

  async decryptJson<T>(payload: string): Promise<T> {
    const [ivB64, ctB64] = payload.split('.');
    if (!ivB64 || !ctB64) throw new Error('Invalid encrypted payload');

    const iv = this.fromB64(ivB64);
    const ciphertext = this.fromB64(ctB64);

    const key = await this.deriveKey();
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv as unknown as BufferSource }, key, ciphertext as unknown as BufferSource);

    const json = new TextDecoder().decode(plain);
    return JSON.parse(json) as T;
  }

  private async deriveKey(): Promise<CryptoKey> {
    const baseKey = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(this.passphrase),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: new TextEncoder().encode(this.salt),
        iterations: 100_000,
        hash: 'SHA-256',
      },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  private b64(bytes: Uint8Array): string {
    let s = '';
    bytes.forEach((b) => (s += String.fromCharCode(b)));
    return btoa(s);
  }

  private fromB64(b64: string): Uint8Array {
    const binary = atob(b64);
    const buf = new ArrayBuffer(binary.length); // força ArrayBuffer (não ArrayBufferLike)
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
}
