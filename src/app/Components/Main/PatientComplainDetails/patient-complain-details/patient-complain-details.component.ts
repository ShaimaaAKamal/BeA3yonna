import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../../Services/Shared/shared.service';

@Component({
  selector: 'app-patient-complain-details',
  standalone: false,
  
  templateUrl: './patient-complain-details.component.html',
  styleUrl: './patient-complain-details.component.css'
})
export class PatientComplainDetailsComponent implements OnInit {
  PatientHistory!:FormGroup;
  stortedPatientHistory:any;
  PreviousPageUrl!:string;
  constructor(private __SharedService:SharedService){}

  ngOnInit(): void {
    this.getPreviousPage();
    this.stortedPatientHistory=this.__SharedService.getStoredDataValue('patientHistory');
    this.PatientHistory= new FormGroup({
         complainTime: new FormControl( this.stortedPatientHistory?.complainTime ?? '',[Validators.required]),
         lastMealTime: new FormControl(this.stortedPatientHistory?.lastMealTime ?? '', [Validators.required]),
       });
  }

  getPreviousPage(){
    console.log('in');
  const PatientInitialVitals=this.__SharedService.getStoredDataValue('patientInitialVitals');
  this.PreviousPageUrl=(PatientInitialVitals.length == 0  || PatientInitialVitals.havePeramentDiseases === 'no')
                              ?'Choose_Pained_Body_Part':'Permanent Diseases';
 
  }
}
