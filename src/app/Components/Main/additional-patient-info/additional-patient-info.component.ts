import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../Services/Shared/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientAdditionalInfo } from '../../../Interfaces/patient-additional-info';

@Component({
  selector: 'app-additional-patient-info',
  standalone: false,
  
  templateUrl: './additional-patient-info.component.html',
  styleUrl: './additional-patient-info.component.css'
})
export class AdditionalPatientInfoComponent implements OnInit{
additionalPatientInfo!:FormGroup;
storedPatientAdditionalInfo:PatientAdditionalInfo|null=null;
constructor(private __sharedService:SharedService){}
ngOnInit(): void {
this.storedPatientAdditionalInfo=this.__sharedService.getItemFromLocalStorage('additionalPatientInfo')?JSON.parse(this.__sharedService.getItemFromLocalStorage('additionalPatientInfo')):null;
 this.additionalPatientInfo= new FormGroup({
     pregnant: new FormControl( this.storedPatientAdditionalInfo?.pregnant ?? '',[Validators.required]),
     havePeriod: new FormControl(this.storedPatientAdditionalInfo?.havePeriod ?? '', [Validators.required]),
     additionalInfo:new FormControl( this.storedPatientAdditionalInfo?.pregnant ??''),
   });
}
BackToPreviousPage(){
this.__sharedService.navigateToPage('/Patient_Info');
  }
navigateNextPage(){
this.__sharedService.saveItemInLocalStorage('additionalPatientInfo',JSON.stringify(this.additionalPatientInfo.value));
this.__sharedService.navigateToPage('/Patient_Initial_Vitals');
}
}
