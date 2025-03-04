import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SharedService } from '../Shared/shared.service';
import { HttpClient } from '@angular/common/http';
import { Country } from '../../Interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  constructor(private __SharedService:SharedService) { }
  getCountries():Observable<Country[]>{
    // return this.__SharedService.sendGetRequest('https://restcountries.com/v3.1/all');
     return this.__SharedService.sendGetRequest('https://restcountries.com/v3.1/all').pipe(
    catchError(error => {
      console.error(`Error fetching countries":`, error);
      return throwError(() => new Error(`Countries are not found or API error.`));
    })
  );

  }

 
  searchByCountryName(name: string): Observable<Country[]> {
  return this.__SharedService.sendGetRequest(`https://restcountries.com/v3.1/translation/${name}`).pipe(
    catchError(error => {
      console.error(`Error fetching country data for "${name}":`, error);
      return throwError(() => new Error(`Country not found or API error.`));
    })
  );
}
}
