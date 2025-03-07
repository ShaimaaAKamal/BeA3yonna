import { Component, OnInit } from '@angular/core';
import { LiveTranslationsService } from './Services/LiveTranslationService/live-translations.service';
import { TranslateService } from '@ngx-translate/core';
import { StyleService } from './Services/style/style.service';
import { PatientReportInfoService } from './Services/Shared/PatientReportInfo/patient-report-info.service';
import { NavigationTypeService } from './Services/Navigation/navigation-types.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'beA3yonna';
  constructor(private __LiveTranslationsService:LiveTranslationsService,
    private __TranslateService: TranslateService,private __StyleService:StyleService,
    private __PatientReportInfoService:PatientReportInfoService,
  private __NavigationTypeService:NavigationTypeService){
      const navigationType = this.__NavigationTypeService.getNavigationType();
      (navigationType == 'refresh')
       ?sessionStorage.setItem('internalNavigation', 'true')
      :sessionStorage.removeItem('internalNavigation');
    }

   
  ngOnInit(): void {
  
    this.__TranslateService.setDefaultLang('en'); 
    let saveLang=this.__PatientReportInfoService.getPatientLanguage().lang;
    console.log('saveLang',saveLang);
    saveLang=saveLang?saveLang:'en';
    this.setLanguageAndStyle(saveLang);
    if(saveLang != 'en')
      this.__LiveTranslationsService.loadTranslations(saveLang); 
    else
      this.__PatientReportInfoService.updatePatientDataByKey(['lang','language'],['en','english']);
    console.log('appLang',this.__PatientReportInfoService.getPatientLanguage().lang);
  }
    
    setLanguageAndStyle(lang:string){
      this.__TranslateService.use(lang);
      const isRTL:boolean=this.__StyleService.isRtl(lang);
      this.__StyleService.switchStyleToRTL(isRTL,lang);
    }
}

 