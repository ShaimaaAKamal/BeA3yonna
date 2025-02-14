import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {};
  private language = new BehaviorSubject<string>('en'); // Default language
  currentLanguage = this.language.asObservable();

  constructor(private http: HttpClient) {
    this.loadTranslations('en'); // Load default language
  }

  loadTranslations(lang: string) {
    this.http.get(`/assets/i18n/${lang}.json`).subscribe((data) => {
      this.translations = data;
      this.language.next(lang);
    });
  }

  getTranslation(key: string, params?: { [key: string]: string }): string {
    let translation = this.translations[key] || key;

    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{{${param}}}`, params[param]);
      });
    }

    return translation;
  }

  changeLanguage(lang: string) {
    this.loadTranslations(lang);
  }
}