// import { Component } from '@angular/core';
// import { map, Observable } from 'rxjs';
// import { FlagService } from '../../../Services/Flag/flag.service';
// import { Country } from '../../../Interfaces/country';
import { SharedService } from '../../../Services/Shared/shared.service';
import { Router } from '@angular/router';

// @Component({
//   selector: 'app-choose-flag',
//   standalone: false,
//   templateUrl: './choose-flag.component.html',
//   styleUrl: './choose-flag.component.css'
// })
// export class ChooseFlagComponent {
//   Flags$!:Observable<Country[]>;
//   constructor(private __FlagService:FlagService){}
//   ngOnInit(): void {
//     this.Flags$ = this.__FlagService.getCountries().pipe(
//       map((countries:any) => 
//         countries.map((country: any) => ({
//           name: country.name.common,
//           flags: country.flags, 
//           languages: country.languages 
//         }))
//       )
//     );
//   }

// }

import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { FlagService } from '../../../Services/Flag/flag.service';
import { Country } from '../../../Interfaces/country';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-choose-flag',
  standalone:false,
  templateUrl: './choose-flag.component.html',
  styleUrls: ['./choose-flag.component.css']
})
export class ChooseFlagComponent implements OnInit {
  Flags$!: Observable<Country[]>; 
  NextButtondisabled:boolean=true;
  currentPage:number = 1;
  pageSize:number = 24;
  searchKey:string='';
  selectedFlag!:Country;
  storedCountry!:Country;
  constructor(private __FlagService: FlagService,private __SharedService:SharedService,private __TranslateService:TranslateService) {}

  ngOnInit(): void {
      this.Flags$ =this.mapApiFlagsData(this.__FlagService.getCountries());
      this.storedCountry=this.__SharedService.getGenericStoredDataValue('Country');
      this.NextButtondisabled=!this.storedCountry ? true : false;
      this.currentPage=this.__SharedService.getGenericStoredDataValue('CountrycurrentPage');
      this.selectedFlag=this.storedCountry;
    }

  searchForCountry(){
      this.Flags$ =this.mapApiFlagsData(this.__FlagService.searchByCountryName(this.searchKey));
  }

 
  chooseFlag(Flag:Country){
    this.selectedFlag=Flag;
    this.NextButtondisabled=false;
    this.__SharedService.saveItemInLocalStorage('Country',JSON.stringify(Flag));
    this.__SharedService.saveItemInLocalStorage('CountrycurrentPage',JSON.stringify(this.currentPage));
  }

  mapApiFlagsData(flagData:Observable<any>){
    return flagData.pipe(
          map(countries => (countries ? countries.map((country:any) => ({
            name: country.name.common,
            flags: country.flags,
            languages:country.languages,
          })) : []))
        );
  }

//    mapApiFlagsData(flagData: Observable<any>): Observable<any> {
//     return flagData.pipe(
//       tap((countries:any) => console.log('Fetched flag data:', countries)), // Log flagData for debugging
//       map(countries =>
//         countries.map((country: any) => ({
//           name: country.name.common, // Original name
//           flags: country.flags,
//           languages: Object.values(country.languages || {}),
//         }))
//       ),
//       switchMap(countries => this.applyTranslations(countries)) // Apply translations after mapping
//     );
//   }

// private applyTranslations(countries: any[]): Observable<any[]> {
//   const targetLang = this.__TranslateService.currentLang || 'en'; // Default language


// const translateText = (text: string): Observable<string> => {
//   const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
//   console.log(`Sending request to: ${url}`);

//   return this.__SharedService.sendGetRequest(url).pipe(
//     delay(1000), // Add a 1-second delay between requests
//     map(response => {
//       console.log(`Full Response for "${text}":`, response);
//       const translatedText = response?.responseData?.translatedText || text;
//       console.log(`Translated Text for "${text}":`, translatedText);
//       return translatedText;
//     }),
//     catchError(error => {
//       console.error(`Error translating "${text}":`, error);
//       return of(text); // Fallback to the original text if there's an error
//     })
//   );
// };
//   // Check if countries array is empty
//   if (!countries || countries.length === 0) {
//     console.warn("No countries available for translation.");
//     return of([]);
//   }

//   const translationRequests = countries.map(country => {
//     const nameTranslation$ = translateText(country.name);
//     const languageTranslations$ = forkJoin(country.languages?.map((lang: string) => translateText(lang)) || []);

//     return forkJoin({ name: nameTranslation$, languages: languageTranslations$ }).pipe(
//       map(translated => {
//         console.log(`Translated Country: ${country.name} -> ${translated.name}`);
//         return {
//           ...country,
//           name: translated.name,
//           languages: translated.languages
//         };
//       })
//     );
//   });

//   return forkJoin(translationRequests).pipe(
//     map(translatedCountries => {
//       console.log("Final Translated Countries:", translatedCountries); // Log the final result
//       return translatedCountries;
//     }),
//     catchError(error => {
//       console.error("Error in translation requests:", error);
//       return of([]); // Return empty array if there's an error
//     })
//   );
// }

// mapApiFlagsData(flagData: Observable<any>): Observable<any> {
//   return flagData.pipe(
//     tap((countries: any) => console.log('Fetched flag data:', countries)), // Log flagData for debugging
//     map(countries =>
//       countries.map((country: any) => ({
//         name: country.name.common, // Original name
//         flags: country.flags,
//         languages: Object.values(country.languages || {}),
//       }))
//     ),
//     switchMap(countries => this.applyTranslations(countries)) // Apply translations after mapping
//   );
// }

// private applyTranslations(countries: any[]): Observable<any[]> {
//   const targetLang = this.__TranslateService.currentLang || 'en'; // Default language

//   const translateText = (text: string): Observable<string> => {
//     const url = `https://libretranslate.de/translate`;
//     const body = {
//       q: text,
//       source: 'en', // Source language (can be dynamic based on the country or need)
//       target: targetLang,
//       format: 'text'
//     };

//     console.log(`Sending request to: ${url} with payload`, body);

//     return this.__SharedService.sendPostRequest(url, body).pipe(
//       map((response: any) => {
//         console.log(`Full Response for "${text}":`, response);
//         const translatedText = response?.translatedText || text;
//         console.log(`Translated Text for "${text}":`, translatedText);
//         return translatedText;
//       }),
//       catchError(error => {
//         console.error(`Error translating "${text}":`, error);
//         return of(text); // Fallback to the original text if there's an error
//       })
//     );
//   };

//   // Check if countries array is empty
//   if (!countries || countries.length === 0) {
//     console.warn("No countries available for translation.");
//     return of([]);
//   }

//   const translationRequests = countries.map(country => {
//     const nameTranslation$ = translateText(country.name);
//     const languageTranslations$ = forkJoin(country.languages?.map((lang: string) => translateText(lang)) || []);

//     return forkJoin({ name: nameTranslation$, languages: languageTranslations$ }).pipe(
//       map(translated => {
//         console.log(`Translated Country: ${country.name} -> ${translated.name}`);
//         return {
//           ...country,
//           name: translated.name,
//           languages: translated.languages
//         };
//       })
//     );
//   });

//   return forkJoin(translationRequests).pipe(
//     map(translatedCountries => {
//       console.log("Final Translated Countries:", translatedCountries); // Log the final result
//       return translatedCountries;
//     }),
//     catchError(error => {
//       console.error("Error in translation requests:", error);
//       return of([]); // Return empty array if there's an error
//     })
//   );
// }
}