export interface CryptoPort {
  encryptJson(obj: unknown): Promise<string>;
  decryptJson<T>(payload: string): Promise<T>;
}
