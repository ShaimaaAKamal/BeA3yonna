import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../Services/Shared/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientAdditionalInfo } from '../../../Interfaces/patient-additional-info';
import { LiveTranslationsService } from '../../../Services/LiveTranslationService/live-translations.service';

@Component({
  selector: 'app-additional-patient-info',
  standalone: false,
  
  templateUrl: './additional-patient-info.component.html',
  styleUrl: './additional-patient-info.component.css'
})
export class AdditionalPatientInfoComponent implements OnInit{
additionalPatientInfo!:FormGroup;
storedPatientAdditionalInfo!:PatientAdditionalInfo;
textsToTranslate:string[]=[
  'Additional Patient Info',
  'Are you pregnent ?','Yes','No',
  'Do you have female period ?' ,
  'Additional Information','optional'
]
constructor(private __sharedService:SharedService,private __LiveTranslationsService:LiveTranslationsService){}
ngOnInit(): void {
        this.__LiveTranslationsService.loadTranslations(this.__sharedService.getSiteLanguage(),this.textsToTranslate);
this.storedPatientAdditionalInfo=this.__sharedService.getGenericStoredDataValue('additionalPatientInfo');
 this.additionalPatientInfo= new FormGroup({
     pregnant: new FormControl( this.storedPatientAdditionalInfo.pregnant ,[Validators.required]),
     havePeriod: new FormControl(this.storedPatientAdditionalInfo.havePeriod , [Validators.required]),
     additionalInfo:new FormControl( this.storedPatientAdditionalInfo.additionalInfo ),
   });
}
}
