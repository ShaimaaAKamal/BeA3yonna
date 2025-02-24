import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from '../../Interfaces/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private __HttpClient:HttpClient) { }

  getLanguages():Observable<Language[]>{
        return this.__HttpClient.get<Language[]>('https://libretranslate.com/languages');
  }
}
