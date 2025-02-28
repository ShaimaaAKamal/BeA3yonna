
import { SharedService } from '../../../Services/Shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import {  catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { FlagService } from '../../../Services/Flag/flag.service';
import { Country } from '../../../Interfaces/country';
import { LiveTranslationsService } from '../../../Services/LiveTranslationService/live-translations.service';

@Component({
  selector: 'app-choose-flag',
  standalone:false,
  templateUrl: './choose-flag.component.html',
  styleUrls: ['./choose-flag.component.css']
})
export class ChooseFlagComponent implements OnInit {
  Flags$!: Observable<any[]>; 
  AllFlags$!: Observable<any[]>; 
  NextButtondisabled:boolean=true;
  currentPage:number = 1;
  pageSize:number = 24;
  searchKey:string='';
  selectedFlag!:Country;
  storedCountry!:Country;
  targetLang!:string;
  isLoading:boolean=false;
  displayed:boolean=false;
  constructor(private __FlagService: FlagService,private __SharedService:SharedService,private __LiveTranslationsService:LiveTranslationsService) {}

  ngOnInit(): void {
       this.targetLang=this.__SharedService.getSiteLanguage();
      this.Flags$ =this.mapApiFlagsData(this.__FlagService.getCountries());
      this.AllFlags$=this.Flags$;
      this.storedCountry=this.__SharedService.getGenericStoredDataValue('Country');
      this.NextButtondisabled=!this.storedCountry ? true : false;
      this.currentPage=this.__SharedService.getGenericStoredDataValue('CountrycurrentPage');
      this.selectedFlag=this.storedCountry;
    }

  searchForCountry(){
    if(this.searchKey)
            this.Flags$ =this.mapApiFlagsData(this.__FlagService.searchByCountryName(this.searchKey)); 
    else  
            this.Flags$=this.AllFlags$;
      
  }

  
  chooseFlag(Flag:Country){
    this.selectedFlag=Flag;
    this.NextButtondisabled=false;
    this.__SharedService.saveItemInLocalStorage('Country',JSON.stringify(Flag));
    let currentPage:number=this.currentPage;
    if (this.searchKey) {
    this.AllFlags$.pipe(
      map(Flags => Flags.findIndex(item => item.name === Flag.name)), 
      // tap(index => console.log(index)),
      map(index => {
        const pageNumberCalculateDivation = (index + 1) / this.pageSize;
        const pageNumberCalculateReminder = (index + 1) % this.pageSize;

        // console.log(pageNumberCalculateDivation, pageNumberCalculateReminder);

        return pageNumberCalculateReminder > 0 
          ? Math.ceil(pageNumberCalculateDivation) 
          : pageNumberCalculateDivation;
      }),
      tap(currentPage => {
        // console.log(currentPage);
        this.__SharedService.saveItemInLocalStorage('CountrycurrentPage', JSON.stringify(currentPage));
      })
    ).subscribe();
  } else {
    this.__SharedService.saveItemInLocalStorage('CountrycurrentPage', JSON.stringify(currentPage));
  }
  }


mapApiFlagsData(flagData: Observable<any>): Observable<any> {
  // console.log("🔵 Fetching data...");
  this.isLoading=true;
  this.displayed=false;
  return flagData.pipe(
    // tap(() => console.log("🟡 API call started")), // 
    catchError(error => {
      console.error("🔴 API request failed:", error);
      return of([]); 
    }),
    map(countries => {
      // console.log("🟢 Raw API Response:", countries); 
      this.isLoading=false;
      return countries ? countries.map((country: any) => ({
        originalName: country.name?.common || "Unknown",
        flags: country.flags || {},
        languages: country.languages || {}
      })) : [];
    }),
    switchMap(countries => {
      if (countries.length === 0) {
        this.isLoading=false;
        this.displayed=true;
        // console.log("🟠 No countries found.");
        return of([]);
      }
              this.isLoading=true;
      const translationRequests = countries.map((country: any) =>
        this.__LiveTranslationsService.translateText(country.originalName, this.targetLang).pipe(
          catchError(() => {
            console.warn(`⚠️ Translation failed for: ${country.originalName}`);
            return of(country.originalName);
          }),
          map(translatedName => ({ ...country, name: translatedName }))
        )
      );
                     this.isLoading=false;
      return forkJoin(translationRequests);
    })
  );
}
}