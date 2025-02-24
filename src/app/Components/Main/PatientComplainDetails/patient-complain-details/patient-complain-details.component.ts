import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { PatientHistory } from '../../../../Interfaces/patient-history';
import { LiveTranslationsService } from '../../../../Services/LiveTranslationService/live-translations.service';

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
  textsToTranslate:string[]=[
      'More Details','How long has this been troubling you ?','From Morning',
      'From Evening','Less than 24 hours','After taking the treatment','After eating',
      '2 hours ago','4 hours ago','When was your last meal ?','More than 4 hours',
      'More Than 12 Hours','More Than 4 Hours'
  ]
  constructor(private __SharedService:SharedService,private __LiveTranslationsService:LiveTranslationsService){}

  ngOnInit(): void {
     this.__LiveTranslationsService.loadTranslations(this.__SharedService.getSiteLanguage(),this.textsToTranslate);
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
