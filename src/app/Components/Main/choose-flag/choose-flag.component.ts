
import { Component, HostListener, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import {  catchError, map, switchMap, tap } from 'rxjs/operators';
import { FlagService } from '../../../Services/Flag/flag.service';
import { Country } from '../../../Interfaces/country';
import { LiveTranslationsService } from '../../../Services/LiveTranslationService/live-translations.service';
import { PatientReportInfoService } from '../../../Services/Shared/PatientReportInfo/patient-report-info.service';
import { StyleService } from '../../../Services/style/style.service';
import { SharedService } from '../../../Services/Shared/shared.service';

@Component({
  selector: 'app-choose-flag',
  standalone:false,
  templateUrl: './choose-flag.component.html',
  styleUrls: ['./choose-flag.component.css']
})
export class ChooseFlagComponent implements OnInit {
  Flags$!: Observable<Country[]>;
  AllFlags$!: Observable<Country[]>;
  FilteredFlags$!: Observable<Country[]>; // Stores search results separately
  NextButtondisabled:boolean=true;
  currentPage:number = 1;
  pageSize:number = 24;
  searchKey:string='';
  selectedFlag!:Country;
  storedCountry!:Country;
  targetLang!:string;
  isLoading:boolean=false;
  displayed:boolean=false;
  isRtl!:boolean;

@HostListener('window:load', ['$event'])
@HostListener('window:resize', ['$event'])
  onWindowEvent() {
  this.updatePagination();
  }

  constructor (private __FlagService: FlagService,
    private __LiveTranslationsService:LiveTranslationsService,
    private __PatientReportInfoService:PatientReportInfoService,
    private __StyleService:StyleService,private __SharedService:SharedService) {}

  ngOnInit(): void {
   this.initializeComponent();
     }

  initializeComponent(){
      this.targetLang=this.__PatientReportInfoService.getPatientLanguage().lang;
      this.isRtl=this.__StyleService.isRtl(this.targetLang);

      this.Flags$ =this.fetchFlags(this.__FlagService.getCountries());
      this.AllFlags$=this.Flags$;

      this.storedCountry=this.__PatientReportInfoService.getPatientFieldValueByKey('Country');
      this.NextButtondisabled=!this.storedCountry ? true : false;

      this.currentPage=this.__PatientReportInfoService.getPatientFieldValueByKey('CountrycurrentPage');
      this.selectedFlag=this.storedCountry;
      this.updatePagination()
    }

  handlePageChange(page: number) {
    this.currentPage = page;
  }
  searchForCountry() {
  this.currentPage = 1;
  this.FilteredFlags$ = this.searchKey
    ? this.fetchFlags(this.__FlagService.searchByCountryName(this.searchKey))
    : this.AllFlags$;
  this.Flags$ = this.FilteredFlags$;
  }

  private updatePagination() {
  this.pageSize = this.__SharedService.getPageSize(this.pageSize);

  const source$ = this.searchKey ? this.FilteredFlags$ : this.AllFlags$;

  source$.pipe(
    map(Flags => Flags.findIndex(item => item.name === this.storedCountry?.name)),
    map(index => this.__SharedService.getCurrentPage(index, this.pageSize)),
    tap(currentPage => {
      this.currentPage = currentPage;
      this.__PatientReportInfoService.updatePatientDataByKey(
        ['CountrycurrentPage'], [JSON.stringify(currentPage)]
      );
    })
  ).subscribe();
}

  chooseFlag(Flag:Country){
    this.selectedFlag=Flag;
    this.NextButtondisabled=false;
    this.__PatientReportInfoService.updatePatientDataByKey(['Country'],[JSON.stringify(Flag)])
    if (this.searchKey) {
    this.AllFlags$.pipe(
      map(Flags => Flags.findIndex(item => item.capital === Flag.capital)),
      map(index => {
        return this.__SharedService.getCurrentPage(index,this.pageSize);
      }),
      tap(currentPage => {
            this.__PatientReportInfoService.updatePatientDataByKey(['CountrycurrentPage'],[JSON.stringify(currentPage)])
      })
    ).subscribe();
  } else
          this.__PatientReportInfoService.updatePatientDataByKey(['CountrycurrentPage'],[JSON.stringify(this.currentPage)])
  }


fetchFlags(flagData: Observable<Country[]>): Observable<Country[]> {
  this.isLoading=true;
  this.displayed=false;

  return flagData.pipe(
    catchError(error => {
      console.error("🔴 API request failed:", error);
      return of([]);
    }),
    map(countries => {
      this.isLoading=false;
      return countries ? countries.map((country: any) => ({
        originalName: country.name?.common || "Unknown",
        flags: country.flags || {},
        languages: country.languages || {},
        capital:country.capital || [],
        name: country.name?.common || "Unknown",
      })) : [];
    }),
    switchMap(countries =>  this.translateCountries(countries)));
}

  private translateCountries(countries: Country[]): Observable<Country[]> {
     if (countries.length === 0) {
        this.isLoading=false;
        this.displayed=true;
        return of([]);
      }
      if (this.targetLang === 'en') {
        this.isLoading = false;
        this.displayed = false;
        return of(countries);
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
  }
}