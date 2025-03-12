
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
  this.performAction();
  }

  constructor(private __FlagService: FlagService,
    private __LiveTranslationsService:LiveTranslationsService,
    private __PatientReportInfoService:PatientReportInfoService,
    private __StyleService:StyleService,private __SharedService:SharedService) {}

  ngOnInit(): void {
      this.targetLang=this.__PatientReportInfoService.getPatientLanguage().lang;
      this.isRtl=this.__StyleService.isRtl(this.targetLang);
      this.Flags$ =this.mapApiFlagsData(this.__FlagService.getCountries());
      this.AllFlags$=this.Flags$;
      this.storedCountry=this.__PatientReportInfoService.getPatientFieldValueByKey('Country');
      this.NextButtondisabled=!this.storedCountry ? true : false;
      this.currentPage=this.__PatientReportInfoService.getPatientFieldValueByKey('CountrycurrentPage');
      this.selectedFlag=this.storedCountry;
      this.performAction()
     }

  private performAction() {
    this.pageSize = this.__SharedService.getPageSize(this.pageSize);
    this.AllFlags$.pipe(
      map(Flags =>
        Flags.findIndex(item =>
          item.name === this.__PatientReportInfoService.getPatientFieldValueByKey('Country').name
        )
      ),
      map(index => this.__SharedService.getCurrentPage(index, this.pageSize)),
      tap(currentPage => {
        this.currentPage = currentPage;
        this.__PatientReportInfoService.updatePatientDataByKey(
          ['CountrycurrentPage'],
          [JSON.stringify(currentPage)]
        );
      })
    ).subscribe();
  }

  handlePageChange(page: number) {
    this.currentPage = page;
  }
  searchForCountry(){
      this.currentPage = 1;
    if(this.searchKey)
            this.Flags$ =this.mapApiFlagsData(this.__FlagService.searchByCountryName(this.searchKey));
    else
            this.Flags$=this.AllFlags$;
  }

  chooseFlag(Flag:Country){
    this.selectedFlag=Flag;
    this.NextButtondisabled=false;
    this.__PatientReportInfoService.updatePatientDataByKey(['Country'],[JSON.stringify(Flag)])
    let currentPage:number=this.currentPage;
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
          this.__PatientReportInfoService.updatePatientDataByKey(['CountrycurrentPage'],[JSON.stringify(currentPage)])
  }


mapApiFlagsData(flagData: Observable<Country[]>): Observable<Country[]> {
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
        languages: country.languages || {},
        capital:country.capital || [],
        name: country.name?.common || "Unknown",
      })) : [];
    }),
    switchMap(countries => {
      if (countries.length === 0) {
        this.isLoading=false;
        this.displayed=true;
        // console.log("🟠 No countries found.");
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
    })
  );
}

}