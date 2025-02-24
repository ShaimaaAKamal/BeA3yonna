import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientInfo } from '../../../../Interfaces/patient-info';

@Component({
  selector: 'app-patient-info',
  standalone: false,
  
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.css'
})
export class PatientInfoComponent implements OnInit {
  NextButtondisabled:boolean=true;
  selectedFemaleGender:boolean=false;
  selectedMaleGender:boolean=false;
  changeGender:boolean=true;
  storedPatientInfo!:PatientInfo;
  patientInfoForm !:FormGroup;


  
  constructor(private __sharedService:SharedService){}
  ngOnInit(): void {
     this.storedPatientInfo=this.__sharedService.getGenericStoredDataValue('patientInfo');
     this.patientInfoForm = new FormGroup({
    name: new FormControl(this.storedPatientInfo.name ,[Validators.required, Validators.minLength(3)]),
    age: new FormControl(this.storedPatientInfo.age , [Validators.required,Validators.min(1),Validators.max(100),Validators.pattern('^[0-9]+$')]),
    gender: new FormControl(this.storedPatientInfo.gender , [Validators.required]),
  });
  if(this.storedPatientInfo?.gender)
        this.selectGender(this.storedPatientInfo?.gender)
    }
  BackToPreviousPage(){
    this.__sharedService.navigateToPage('/Choose_Flag');
  }
  navigateNextPage(){
    this.__sharedService.saveItemInLocalStorage('patientInfo',JSON.stringify(this.patientInfoForm.value));
    if(this.selectedFemaleGender)
      this.__sharedService.navigateToPage('/Addtional_Patient_Info');
    else this.__sharedService.navigateToPage('/Patient_Initial_Vitals');
  }

  selectGender(gender:string){
    this.selectedFemaleGender=(gender == 'female')? true : false;
    this.selectedMaleGender=(gender == 'female')? false : true;
    this.changeGender=false;
  }

  changeGenderSelection(){
    this.selectedFemaleGender=!this.selectedFemaleGender;
    this.selectedMaleGender=! this.selectedMaleGender;
    this.patientInfoForm.patchValue({gender:  this.selectedFemaleGender ? "female":"male"});
  }
}
