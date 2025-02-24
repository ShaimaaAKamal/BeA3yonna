
import { SharedService } from '../../../Services/Shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import {  map, switchMap } from 'rxjs/operators';
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
  NextButtondisabled:boolean=true;
  currentPage:number = 1;
  pageSize:number = 24;
  searchKey:string='';
  selectedFlag!:Country;
  storedCountry!:Country;
  targetLang!:string;
  constructor(private __FlagService: FlagService,private __SharedService:SharedService,private __LiveTranslationsService:LiveTranslationsService) {}

  ngOnInit(): void {
       this.targetLang=this.__SharedService.getSiteLanguage();
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


  mapApiFlagsData(flagData: Observable<any>):Observable<any>{
  return flagData.pipe(
    map(countries => countries ? countries.map((country: any) => ({
      originalName: country.name.common, 
      flags: country.flags,
      languages: country.languages
    })) : []),
    switchMap(countries => {
      if (countries.length === 0) return of([]); 

      const translationRequests = countries.map((country:any) =>
        this.__LiveTranslationsService.translateText(country.originalName, this.targetLang).pipe(
          map(translatedName => ({ ...country, name: translatedName })) // Add translated name
        )
      );

      return forkJoin(translationRequests); // Wait for all translations to complete
    })
  );
}
}