import { Component } from '@angular/core';

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

}
