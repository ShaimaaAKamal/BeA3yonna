import { LanguageService } from '../../../Services/language/language.service';
import { Language } from '../../../Interfaces/language';
import {  Component } from '@angular/core';
import {  catchError, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { StyleService } from '../../../Services/style/style.service';
import { SharedService } from '../../../Services/Shared/shared.service';
import { Selec2 } from '../../../Interfaces/selec2';
import { LiveTranslationsService } from '../../../Services/LiveTranslationService/live-translations.service';
import { PatientReportInfoService } from '../../../Services/Shared/PatientReportInfo/patient-report-info.service';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent{
 disabled:boolean=true;
 languages$!:Observable<Language[]>;
 AllLanguages$!:Observable<Language[]>;
 ChooseLanguage: string = 'Choose a Language';
 chooseenLanguage:string='';

 constructor(private __LanguageService:LanguageService,
  private __TranslationService:TranslateService,
  private __StyleService:StyleService,
  private __sharedService:SharedService,
  private __LiveTranslation:LiveTranslationsService,
  private __PatientReportInfoService:PatientReportInfoService){}

 ngOnInit(): void {
  this.chooseenLanguage=this.__PatientReportInfoService.getPatientLanguage().lang;
  this.disabled=(this.chooseenLanguage)?false:true;
  if(this.__PatientReportInfoService.getPatientLanguage().lang == 'en' || !this.__PatientReportInfoService.getPatientLanguage().lang)
{    this.languages$=this.__LanguageService.getLanguages();
     this.AllLanguages$=this.languages$;
}  else
      this.languages$ =this.getLanguagesTranslation(this.__PatientReportInfoService.getPatientLanguage().lang);
 }


 onLanguageChoose(event:Selec2){
      const selectedLanguage=event.value;
      this.chooseenLanguage=selectedLanguage;
      this.__StyleService.setLanguageAndStyle(selectedLanguage);
      this.__PatientReportInfoService.updatePatientDataByKey(['lang','language'],[selectedLanguage,event.text]);
      this.languages$ = this.getLanguagesTranslation(selectedLanguage);
      if(selectedLanguage != 'en')
          this.__LiveTranslation.loadTranslations(selectedLanguage);
      this.disabled=false;
 }

 navigateToChooseFlag(){
     this.__sharedService.navigateToPage('/Choose_Flag');
 }

  getLanguagesTranslation(targetLang:string): Observable<Language[]> {
      return this.__LanguageService.getLanguages().pipe(
      switchMap(languages => {
        if (!languages || languages.length === 0) {
          console.warn('No languages received from API');
          return of([]);
        }
        if (targetLang === 'en') {
        return of(languages);
      }
       return this.translateLanguages(languages,targetLang);
      }),
      catchError(error => {
        console.error('Error fetching languages from API:', error);
        return of([]);
      })
    );
  }

  private translateLanguages(languages: Language[], targetLang: string): Observable<Language[]> {
    const translationRequests = languages.map(lang =>
      this.__LiveTranslation.translateText(lang.name, targetLang).pipe(
        map(translatedName => ({
          ...lang,
          name: translatedName || lang.name
        })),
        catchError(error => {
          console.error(`Error translating '${lang.name}':`, error);
          return of({ ...lang, name: lang.name });
        })
      )
    );

    return forkJoin(translationRequests);
  }
}




