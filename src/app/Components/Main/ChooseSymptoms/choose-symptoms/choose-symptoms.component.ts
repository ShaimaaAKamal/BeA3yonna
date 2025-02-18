import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../Services/Shared/shared.service';

@Component({
  selector: 'app-choose-symptoms',
  standalone: false,
  
  templateUrl: './choose-symptoms.component.html',
  styleUrl: './choose-symptoms.component.css'
})
export class ChooseSymptomsComponent implements OnInit {
NextButtonDisabled:boolean=true;
PatientSymptoms:string[]=[];
currentPage:number=1;
pageSize:number=20;
searchKey:string='';
symptoms:string[]=[];
AllSymptoms:string[]=['Armache','Back Pain','Vomit','Toothache','Diabetic','Dizznies','Sneezing','Blood Pressure','Eye Pain'
  ,'Pulse Measurment','Nausea','Allgery','HandAche','Weight Scale','Stomach Pain','Heart  Rate','Heart Attack','Shoulder Pain','Temperature'
]
selectedSymptoms: string[] = [];
storedSymptoms:string[]=[];

constructor(private __SharedService:SharedService){}

ngOnInit(): void {
  this.symptoms=this.AllSymptoms;
 this.storedSymptoms=this.__SharedService.getItemFromLocalStorage('Symptoms')?JSON.parse(this.__SharedService.getItemFromLocalStorage('Symptoms')):[];
 this.selectedSymptoms=this.storedSymptoms;
this.NextButtonDisabled=(this.selectedSymptoms.length !=0 ) ?false:true;
}

chooseSymptom(symptom: string) {
  const index = this.selectedSymptoms.indexOf(symptom);
  if (index === -1) 
    this.selectedSymptoms.push(symptom); 
  else
    this.selectedSymptoms.splice(index, 1); 
  this.NextButtonDisabled=(this.selectedSymptoms.length !=0 ) ?false:true;
}

isSelected(symptom: string): boolean {
  return this.selectedSymptoms.includes(symptom);
}

searchForSymptoms(){
if(!this.searchKey) this.symptoms=this.AllSymptoms
else this.symptoms=this.filterSymptoms();
}

filterSymptoms() {
  const filteredSymptoms = this.AllSymptoms.filter((symptom:string) => 
    symptom.toLowerCase().includes(this.searchKey.toLowerCase())
  );
  return filteredSymptoms;
}
}
