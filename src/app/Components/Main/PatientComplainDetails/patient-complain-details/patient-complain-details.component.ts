import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientHistory } from '../../../../Interfaces/patient-history';
import { PatientReportInfoService } from '../../../../Services/Shared/PatientReportInfo/patient-report-info.service';

@Component({
  selector: 'app-patient-complain-details',
  standalone: false,
  
  templateUrl: './patient-complain-details.component.html',
  styleUrl: './patient-complain-details.component.css'
})
export class PatientComplainDetailsComponent implements OnInit {
  PatientHistory!:FormGroup;
  stortedPatientHistory!:PatientHistory;
  PreviousPageUrl!:string;
 
  constructor(private __PatientReportInfoService:PatientReportInfoService){}

  ngOnInit(): void {
    this.getPreviousPage();
    this.stortedPatientHistory=this.__PatientReportInfoService.getPatientFieldValueByKey('patientHistory');
    this.PatientHistory= new FormGroup({
         complainTime: new FormControl( this.stortedPatientHistory?.complainTime ?? '',[Validators.required]),
         lastMealTime: new FormControl(this.stortedPatientHistory?.lastMealTime ?? '', [Validators.required]),
       });
  }

  getPreviousPage(){
   const PatientInitialVitals=this.__PatientReportInfoService.getPatientFieldValueByKey('patientInitialVitals');
  this.PreviousPageUrl=(PatientInitialVitals.havePeramentDiseases === 'no' || !PatientInitialVitals.havePeramentDiseases)
                              ?'Choose_Pained_Body_Part':'Permanent Diseases';
  }
}
