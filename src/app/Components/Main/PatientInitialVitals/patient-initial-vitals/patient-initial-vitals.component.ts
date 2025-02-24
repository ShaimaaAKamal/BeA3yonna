import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientInitialVitals } from '../../../../Interfaces/patient-initial-vitals';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { LiveTranslationsService } from '../../../../Services/LiveTranslationService/live-translations.service';

@Component({
  selector: 'app-patient-initial-vitals',
  standalone: false,
  
  templateUrl: './patient-initial-vitals.component.html',
  styleUrl: './patient-initial-vitals.component.css'
})
export class PatientInitialVitalsComponent {
  textsToTranslate :string[]= [
    'Patient Initial Vitals',
    'Do you any allergy ?',
    'Yes',
    'No',
    'Do you have any permanent diseases ?',
    'Do you have any Infectious diseases ?',
    'Presubscribed Medications'
  ];
PatientInitialVitals!:FormGroup;
storedPatientVital!:PatientInitialVitals;
previousPageUrl!:string;
constructor(private __sharedService:SharedService,private __LiveTranslationsService:LiveTranslationsService){}

ngOnInit(): void {
  this.getPreviousPage();
  this.__LiveTranslationsService.loadTranslations(this.__sharedService.getSiteLanguage(),this.textsToTranslate);
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
