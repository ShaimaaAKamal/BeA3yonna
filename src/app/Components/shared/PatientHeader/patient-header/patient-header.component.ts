import { Component, OnInit } from '@angular/core';
import { PatientInfo } from '../../../../Interfaces/patient-info';
import { Country } from '../../../../Interfaces/country';
import { PatientReportInfoService } from '../../../../Services/Shared/PatientReportInfo/patient-report-info.service';
import { LiveTranslationsService } from '../../../../Services/LiveTranslationService/live-translations.service';

@Component({
  selector: 'app-patient-header',
  standalone: false,
  
  templateUrl: './patient-header.component.html',
  styleUrl: './patient-header.component.css'
})
export class PatientHeaderComponent implements OnInit{
  patientInfo!:PatientInfo;
  language:string='';
  country!:Country;
  IsFemale:boolean=false;
  emptyCountry:Country={name:"",flags:{},languages:{}}
constructor(private __PatientReportInfoService:PatientReportInfoService,private __LiveTranslationsService:LiveTranslationsService){}
ngOnInit(): void {
  this.patientInfo=this.__PatientReportInfoService.getPatientFieldValueByKey('patientInfo');
  this.IsFemale=( this.patientInfo.gender == "female" )? true :false;
  this.country=this.__PatientReportInfoService.getPatientFieldValueByKey('Country')?this.__PatientReportInfoService.getPatientFieldValueByKey('Country'):this.emptyCountry;
  this.__LiveTranslationsService.translateText(this.__PatientReportInfoService.getPatientLanguage().language,this.__PatientReportInfoService.getPatientLanguage().lang)
  .subscribe({next :(translatedLang:string)=> this.language=translatedLang })
  // this.language=this.__PatientReportInfoService.getPatientLanguage().language;
}
}
