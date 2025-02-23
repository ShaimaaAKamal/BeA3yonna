
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiveTranslationsService {

  // private apiUrl = 'https://api.mymemory.translated.net/get';

  constructor(private http: HttpClient, private __TranslateService: TranslateService) {}

  translateText(text: string, targetLang: string): Observable<string> {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    return this.http.get<any>(url).pipe(
      map((response) => response[0][0][0]) // Extract translated text
    );
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
