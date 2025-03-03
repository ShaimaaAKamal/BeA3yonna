import { Component, OnInit } from '@angular/core';
import { PatientInfo } from '../../../../Interfaces/patient-info';
import { Country } from '../../../../Interfaces/country';
import { PatientReportInfoService } from '../../../../Services/Shared/PatientReportInfo/patient-report-info.service';

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
constructor(private __PatientReportInfoService:PatientReportInfoService){}
ngOnInit(): void {
  this.patientInfo=this.__PatientReportInfoService.getPatientFieldValueByKey('patientInfo');
  this.IsFemale=( this.patientInfo.gender == "female" )? true :false;
  this.country=this.__PatientReportInfoService.getPatientFieldValueByKey('Country')?this.__PatientReportInfoService.getPatientFieldValueByKey('Country'):this.emptyCountry;
    this.language=this.__PatientReportInfoService.getPatientLanguage().language;
}
}
