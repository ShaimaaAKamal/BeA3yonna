
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiveTranslationsService {

  // private apiUrl = 'https://api.mymemory.translated.net/get';

  constructor(private http: HttpClient, private __TranslateService: TranslateService) {}

  // translateText(text: string, targetLang: string): Observable<string> {
  //   const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

  //   return this.http.get<any>(url).pipe(
  //     map((response) => response[0][0][0]) // Extract translated text
  //   );
  // }

  translateTexts(texts: string[], targetLang: string): Observable<{ [key: string]: string }> {
    console.log('targetLang',targetLang);
    const requests = texts.map(text => {
      if (!text.trim()) {
        return of(''); // If text is empty, return empty string
      }

       const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
      console.log('url',url);     
      return this.http.get<any>(url).pipe(
        map(response => {
          // Validate response structure
          if (response && Array.isArray(response) && response[0] && Array.isArray(response[0]) &&
              response[0][0] && Array.isArray(response[0][0]) && response[0][0][0]) {
            return response[0][0][0]; // Extract translated text
          } else {
            console.error('Unexpected API response format:', response);
            return 'Translation error'; // Fallback text
          }
        }),
        catchError(error => {
          console.error('Translation API error:', error);
          return of('Translation error'); // Handle error and return a default message
        })
      );
    });

    return forkJoin(requests).pipe(
      map((translations: string[]) => {
        const translationMap: { [key: string]: string } = {};
        texts.forEach((text, index) => {
          translationMap[text] = translations[index] || 'Translation error';
        });
        return translationMap;
      })
    );
  }
  //   translateTexts(texts: string[], targetLang: string): Observable<{ [key: string]: string }> {
  //   const requests = texts.map(text => {
  //     const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  //     return this.http.get<any>(url).pipe(map(response => response[0][0][0]));
  //   });

  //   return forkJoin(requests).pipe(
  //     map((translations: string[]) => {
  //       const translationMap: { [key: string]: string } = {};
  //       texts.forEach((text, index) => {
  //         translationMap[text] = translations[index];
  //       });
  //       return translationMap;
  //     })
  //   );
  // }

  setTranslations(lang: string, translations: { [key: string]: string }) {
    this.__TranslateService.setTranslation(lang, translations, true); // Merges translations
    this.__TranslateService.use(lang);
  }

   loadTranslations(lang: string,textsToTranslate:string[]) {
    this.translateTexts(textsToTranslate, lang).subscribe(translations => {
      this.setTranslations(lang, translations);
    });
  }

  // translateText(key: string, text: string, from: string, to: string): void {
  //   const url = `${this.apiUrl}?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;

  //   this.http.get<any>(url).pipe(
  //     map(response => response.responseData.translatedText)
  //   ).subscribe(translatedText => {
  //     // Dynamically set the translation in ngx-translate
  //     this.__TranslateService.setTranslation(to, { [key]: translatedText }, true);
  //     this.__TranslateService.use(to);
  //   });
  // }

  //   translateLive(text: string, from: string, to: string) {
  //   const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
  //   this.http.get<any>(apiUrl).subscribe(response => {
  //     this.translatedText = response.responseData.translatedText;
  //   });
  // }
}
