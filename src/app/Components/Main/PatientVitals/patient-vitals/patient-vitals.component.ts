import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientVitals } from '../../../../Interfaces/patient-vitals';

@Component({
  selector: 'app-patient-vitals',
  standalone: false,
  
  templateUrl: './patient-vitals.component.html',
  styleUrl: './patient-vitals.component.css'
})
export class PatientVitalsComponent implements OnInit {
  patientVitals!:FormGroup;
  vitals:string[]=['Weight','Height','Blood_Pressure','Blood_Sugar','Temperature','Heart_Rate','Breathe_Rate','Oxgyen_Rate'];
  storedPatientVitals:PatientVitals|null=null;
  constructor(private __SharedService:SharedService){}

  ngOnInit(): void {
    this.storedPatientVitals=this.__SharedService.getItemFromLocalStorage('patientVitals')?JSON.parse(this.__SharedService.getItemFromLocalStorage('patientVitals')):null;
    this.patientVitals = new FormGroup({
        Weight: new FormControl(this.storedPatientVitals?.Weight ?? '',[Validators.required]),
        Height: new FormControl(this.storedPatientVitals?.Height ?? '', [Validators.required]),
        Temperature: new FormControl(this.storedPatientVitals?.Temperature ?? '', [Validators.required]),
        Blood_Pressure: new FormControl(this.storedPatientVitals?.Blood_Pressure ?? '', [Validators.required]),
        Oxgyen_Rate: new FormControl(this.storedPatientVitals?.Oxgyen_Rate ?? '', [Validators.required]),
        Blood_Sugar: new FormControl(this.storedPatientVitals?.Blood_Sugar ?? '', [Validators.required]),
        Heart_Rate: new FormControl(this.storedPatientVitals?.Heart_Rate ?? '', [Validators.required]),
        Breathe_Rate: new FormControl(this.storedPatientVitals?.Breathe_Rate ?? '', [Validators.required]),
      });
  }
}
