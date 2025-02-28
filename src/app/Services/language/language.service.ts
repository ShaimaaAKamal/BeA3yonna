import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Language } from '../../Interfaces/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private __HttpClient:HttpClient) { }

  getLanguages():Observable<Language[]>{
       return  this.__HttpClient.get<Language[]>('https://libretranslate.com/languages').pipe(
        catchError(error => {
          console.error(`Error fetching Languages":`, error);
          // return throwError(() => new Error(`Languages are not found or API error.`));
          return of([{code: "en",name: "English",targets: ["ar","az","bg","bn"]}]); 
          
        })
      );
        // return this.__HttpClient.get<Language[]>('https://libretranslate.com/languages');
  }
}
