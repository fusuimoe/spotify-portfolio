import { kv } from '@vercel/kv'

import {
  DatabaseEncryptedKeys,
  DatabaseKeys,
  IDBConnection,
} from '@/application/interfaces/IDBConnection'
import { IEncrypter } from '@/application/interfaces/IEncrypter'

/**
 * RedisによるDBの実装
 * 暗号化・復号クラスに依存している
 */
export class RedisConnection implements IDBConnection {
  private encrypter: IEncrypter

  constructor(encrypter: IEncrypter) {
    this.encrypter = encrypter
  }

  async get<T>(key: DatabaseKeys) {
    return (await kv.get(key)) as T
  }

  async getParsed<T>(key: DatabaseKeys) {
    const data = await kv.get(key)
    // FIXME: JSONのdataがobjectで取得されているためparseする必要がない
    // ioredis使っていたころはstringで取得されていた
    return data ? (JSON.parse(data as string) as T) : null
  }

  async getEncrypted<T>(key: DatabaseEncryptedKeys) {
    const encrypted = (await kv.get(key)) as string
    if (encrypted) {
      try {
        const decrypted = this.encrypter.decrypt(encrypted)
        return decrypted as T
      } catch (e) {
        console.error(e)
        return null
      }
    } else {
      return null
    }
  }

  async set<T, U extends string = DatabaseKeys>(key: U, data: T) {
    let value = data
    if (typeof data !== 'string') {
      value = JSON.stringify(data) as any
    }
    return await kv.set(key, value as any).then(async () => {
      return (await kv.get(key)) as T
    })
  }

  async setEncrypted<T>(key: DatabaseEncryptedKeys, data: string) {
    try {
      const encrypted = this.encrypter.encrypt(data)
      if (encrypted) {
        return (await this.set<string, DatabaseEncryptedKeys>(
          key,
          encrypted
        )) as T
      } else {
        return null
      }
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
