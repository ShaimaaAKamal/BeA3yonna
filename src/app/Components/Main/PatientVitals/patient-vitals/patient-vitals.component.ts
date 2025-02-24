import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientVitals } from '../../../../Interfaces/patient-vitals';
import { LiveTranslationsService } from '../../../../Services/LiveTranslationService/live-translations.service';

@Component({
  selector: 'app-patient-vitals',
  standalone: false,
  
  templateUrl: './patient-vitals.component.html',
  styleUrl: './patient-vitals.component.css'
})
export class PatientVitalsComponent implements OnInit {
  patientVitals!:FormGroup;
  vitals:string[]=['Weight','Height','Blood_Pressure','Blood_Sugar','Temperature','Heart Rate','Breathe_Rate','Oxygen Rate'];
  storedPatientVitals!:PatientVitals;
  textsToTranslate:string[]=["patient's vital signs",...this.vitals];
  constructor(private __SharedService:SharedService,private __LiveTranslationsService:LiveTranslationsService){}

  ngOnInit(): void {
    this.__LiveTranslationsService.loadTranslations(this.__SharedService.getSiteLanguage(),this.textsToTranslate);
    this.storedPatientVitals=this.__SharedService.getGenericStoredDataValue('patientVitals');
    this.patientVitals = new FormGroup({
        Weight: new FormControl(this.storedPatientVitals?.Weight ?? '',[Validators.required,Validators.pattern('^[0-9]+$')]),
        Height: new FormControl(this.storedPatientVitals?.Height ?? '', [Validators.required,Validators.pattern('^[0-9]+$')]),
        Temperature: new FormControl(this.storedPatientVitals?.Temperature ?? '', [Validators.required,Validators.pattern('^[0-9]+$')]),
        Blood_Pressure: new FormControl(this.storedPatientVitals?.Blood_Pressure ?? '', [Validators.required,Validators.pattern('^[0-9]+$')]),
       'Oxygen Rate': new FormControl(this.storedPatientVitals?.['Oxygen Rate']?? '', [Validators.required,Validators.pattern('^[0-9]+$')]),
        Blood_Sugar: new FormControl(this.storedPatientVitals?.Blood_Sugar ?? '', [Validators.required,Validators.pattern('^[0-9]+$')]),
        'Heart Rate': new FormControl(this.storedPatientVitals?.['Heart Rate']?? '', [Validators.required,Validators.pattern('^[0-9]+$')]),
        Breathe_Rate: new FormControl(this.storedPatientVitals?.Breathe_Rate ?? '', [Validators.required,Validators.pattern('^[0-9]+$')]),
      });
  }
}
