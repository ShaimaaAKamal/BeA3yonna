import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientAdditionalInfo } from '../../../Interfaces/patient-additional-info';
import { PatientReportInfoService } from '../../../Services/Shared/PatientReportInfo/patient-report-info.service';

@Component({
  selector: 'app-additional-patient-info',
  standalone: false,
  
  templateUrl: './additional-patient-info.component.html',
  styleUrl: './additional-patient-info.component.css'
})
export class AdditionalPatientInfoComponent implements OnInit{
additionalPatientInfo!:FormGroup;
storedPatientAdditionalInfo!:PatientAdditionalInfo;

constructor(private __PatientReportInfoService:PatientReportInfoService){}
ngOnInit(): void {
  this.storedPatientAdditionalInfo=this.__PatientReportInfoService.getPatientFieldValueByKey('additionalPatientInfo');
 this.additionalPatientInfo= new FormGroup({
     pregnant: new FormControl( this.storedPatientAdditionalInfo.pregnant ,[Validators.required]),
     havePeriod: new FormControl(this.storedPatientAdditionalInfo.havePeriod , [Validators.required]),
     additionalInfo:new FormControl( this.storedPatientAdditionalInfo.additionalInfo ),
   });
}
}
