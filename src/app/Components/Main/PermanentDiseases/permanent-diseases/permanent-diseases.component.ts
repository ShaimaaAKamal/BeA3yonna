import { Component } from '@angular/core';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { PatientInitialVitals } from '../../../../Interfaces/patient-initial-vitals';

@Component({
  selector: 'app-permanent-diseases',
  standalone: false,
  templateUrl: './permanent-diseases.component.html',
  styleUrl: './permanent-diseases.component.css'
})
export class PermanentDiseasesComponent{
PermanentDiseases:string[]=['Blood Pressure','Diabetic','Back Pain','Allgery','Stomach Pain','Shoulder Pain','Temperature'];
NextButtonDisabled:boolean=true;
selectedSymptoms:string[]=[];

constructor(private __SharedService:SharedService){}

ngOnInit(): void {
  const PatientInitialVitals:PatientInitialVitals=this.__SharedService.getGenericStoredDataValue('patientInitialVitals');
  if(PatientInitialVitals.havePeramentDiseases === 'no' || !PatientInitialVitals.havePeramentDiseases)  
    this.__SharedService.navigateToPage('/Patient_History');
}
}
