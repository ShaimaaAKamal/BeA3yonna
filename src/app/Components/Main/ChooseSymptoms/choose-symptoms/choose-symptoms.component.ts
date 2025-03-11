import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../Services/Shared/shared.service';

@Component({
  selector: 'app-choose-symptoms',
  standalone: false,

  templateUrl: './choose-symptoms.component.html',
  styleUrl: './choose-symptoms.component.css'
})
export class ChooseSymptomsComponent  {
AllSymptoms:string[]=['Armache','Back Pain','Vomit','Toothache','Diabetic','Dizznies','Sneezing','Blood Pressure','Eye Pain'
  ,'Pulse Measurment','Nausea','Allergy','HandAche','Weight Scale','Stomach Pain','Heart Rate','Heart Attack','Shoulder Pain','Temperature'
]
NextButtonDisabled:boolean=true;
selectedSymptoms:string[]=[];
}
