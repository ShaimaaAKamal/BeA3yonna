import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private __HttpClient:HttpClient) { }

  getLanguages():Observable<any>{
        return this.__HttpClient.get('https://libretranslate.com/languages');
  }
}
