import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../Shared/shared.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  constructor(private __SharedService:SharedService) { }
  getCountries():Observable<any>{
    return this.__SharedService.sendGetRequest('https://restcountries.com/v3.1/all');
  }

  searchByCountryName(name:string){
    return this.__SharedService.sendGetRequest(`https://restcountries.com/v3.1/translation/${name}`);
  }
}
