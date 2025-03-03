import { Component, OnInit } from '@angular/core';
import { SharedService } from './Services/Shared/shared.service';
import { LiveTranslationsService } from './Services/LiveTranslationService/live-translations.service';
import { TranslateService } from '@ngx-translate/core';
import { StyleService } from './Services/style/style.service';
import { PatientReportInfoService } from './Services/Shared/PatientReportInfo/patient-report-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'beA3yonna';
  constructor(private __SharedService:SharedService,private __LiveTranslationsService:LiveTranslationsService,
    private __TranslateService: TranslateService,private __StyleService:StyleService,private __PatientReportInfoService:PatientReportInfoService){}

  ngOnInit(): void {
    this.__TranslateService.setDefaultLang('en'); 
    const saveLang=this.__SharedService.getSiteLanguage() ? this.__SharedService.getSiteLanguage() : 'en';
    this.setLanguageAndStyle(saveLang);
    if(saveLang != 'en')
    this.__LiveTranslationsService.loadTranslations(this.__SharedService.getSiteLanguage()); 
    else
      this.__PatientReportInfoService.updatePatientDataByKey(['lang','language'],['en','english']);
  }
    setLanguageAndStyle(lang:string){
      this.__TranslateService.use(lang);
      const isRTL:boolean=this.__StyleService.isRtl(lang);
      this.__StyleService.switchStyleToRTL(isRTL,lang);
    }
}
