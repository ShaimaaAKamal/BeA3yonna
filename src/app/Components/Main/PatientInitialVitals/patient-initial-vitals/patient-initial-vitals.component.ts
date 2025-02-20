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
constructor(private __sharedService:SharedService){}
ngOnInit(): void {
this.storedPatientVital=this.__sharedService.getGenericStoredDataValue('patientInitialVitals');
this.PatientInitialVitals= new FormGroup({
     haveAllergy: new FormControl( this.storedPatientVital.haveAllergy ,[Validators.required]),
     havePeramentDiseases: new FormControl(this.storedPatientVital.havePeramentDiseases , [Validators.required]),
     haveInfectiousDiseases: new FormControl(this.storedPatientVital.haveInfectiousDiseases , [Validators.required]),
     presubscribedMedication:new FormControl( this.storedPatientVital.presubscribedMedication),
   });
}
BackToPreviousPage(){ 
  const patientInfo=this.__sharedService.getGenericStoredDataValue('patientInfo');
if(patientInfo.gender === 'male')
    this.__sharedService.navigateToPage('/Patient_Info');
else  if (patientInfo.gender === 'female') this.__sharedService.navigateToPage('/Addtional_Patient_Info');
  }
  
navigateNextPage(){
this.__sharedService.saveItemInLocalStorage('patientInitialVitals',JSON.stringify(this.PatientInitialVitals.value));
this.__sharedService.navigateToPage('/Patient_Vitals');
}
}
