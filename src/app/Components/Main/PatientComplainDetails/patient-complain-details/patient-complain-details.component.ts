import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { PatientHistory } from '../../../../Interfaces/patient-history';

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
  constructor(private __SharedService:SharedService){}

  ngOnInit(): void {
    this.getPreviousPage();
    this.stortedPatientHistory=this.__SharedService.getGenericStoredDataValue('patientHistory');
    this.PatientHistory= new FormGroup({
         complainTime: new FormControl( this.stortedPatientHistory?.complainTime ?? '',[Validators.required]),
         lastMealTime: new FormControl(this.stortedPatientHistory?.lastMealTime ?? '', [Validators.required]),
       });
  }

  getPreviousPage(){
  const PatientInitialVitals=this.__SharedService.getGenericStoredDataValue('patientInitialVitals');
  this.PreviousPageUrl=(PatientInitialVitals.havePeramentDiseases === 'no' || !PatientInitialVitals.havePeramentDiseases)
                              ?'Choose_Pained_Body_Part':'Permanent Diseases';
 
  }
}
