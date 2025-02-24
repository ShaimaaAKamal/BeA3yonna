import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientInitialVitals } from '../../../../Interfaces/patient-initial-vitals';
import { SharedService } from '../../../../Services/Shared/shared.service';

@Component({
  selector: 'app-patient-initial-vitals',
  standalone: false,
  
  templateUrl: './patient-initial-vitals.component.html',
  styleUrl: './patient-initial-vitals.component.css'
})
export class PatientInitialVitalsComponent {

PatientInitialVitals!:FormGroup;
storedPatientVital!:PatientInitialVitals;
previousPageUrl!:string;
constructor(private __sharedService:SharedService){}

ngOnInit(): void {
  this.getPreviousPage();
this.storedPatientVital=this.__sharedService.getGenericStoredDataValue('patientInitialVitals');
this.PatientInitialVitals= new FormGroup({
     haveAllergy: new FormControl( this.storedPatientVital.haveAllergy ,[Validators.required]),
     havePeramentDiseases: new FormControl(this.storedPatientVital.havePeramentDiseases , [Validators.required]),
     haveInfectiousDiseases: new FormControl(this.storedPatientVital.haveInfectiousDiseases , [Validators.required]),
     presubscribedMedication:new FormControl( this.storedPatientVital.presubscribedMedication),
   });
}

getPreviousPage(){
  const patientInfo=this.__sharedService.getGenericStoredDataValue('patientInfo');
  this.previousPageUrl=(patientInfo.gender === 'male')?'/Patient_Info' :'/Addtional_Patient_Info';
  }
}
