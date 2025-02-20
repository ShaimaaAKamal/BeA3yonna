import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { PatientInfo } from '../../../../Interfaces/patient-info';
import { Country } from '../../../../Interfaces/country';

@Component({
  selector: 'app-patient-header',
  standalone: false,
  
  templateUrl: './patient-header.component.html',
  styleUrl: './patient-header.component.css'
})
export class PatientHeaderComponent implements OnInit{
  patientInfo:any;
  language:string='';
  country!:Country;
  IsFemale:boolean=false;
  emptyCountry:Country={name:"",flags:{},languages:{}}
constructor(private __SharedService:SharedService){}
ngOnInit(): void {
  this.patientInfo=this.__SharedService.getStoredDataValue('patientInfo');
  this.IsFemale=(this.patientInfo.length != 0 && this.patientInfo.gender == "female" )? true :false;
  this.country=this.__SharedService.getStoredDataValue('Country')?this.__SharedService.getStoredDataValue('Country'):this.emptyCountry;
  this.language=this.__SharedService.getItemFromLocalStorage('language');
}
}
