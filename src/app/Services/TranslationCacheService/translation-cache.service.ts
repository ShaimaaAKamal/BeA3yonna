
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationCacheService {
  private cache = new Map<string, { data: any, expiry: number }>();
  private cacheDuration = 1000 * 60 * 60* 24;

  setCache(key: string, value: any): void {
    this.cache.set(key, { data: value, expiry: Date.now() + this.cacheDuration });
  }

  getCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    } else {
      this.cache.delete(key);
      return null;
    }
  }

  hasCache(key: string): boolean {
    return this.cache.has(key) && this.cache.get(key)!.expiry > Date.now();
  }
}