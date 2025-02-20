import { Component, OnInit } from '@angular/core';
import { PainScale } from '../../../../Interfaces/pain-scale';
import { SharedService } from '../../../../Services/Shared/shared.service';

@Component({
  selector: 'app-rate-pain',
  standalone: false,
  
  templateUrl: './rate-pain.component.html',
  styleUrl: './rate-pain.component.css'
})
export class RatePainComponent implements OnInit {
selectedColor:string='#fff;'
painLevel:string='';
painScale!:PainScale;
stortedPainScale!:PainScale;
painScaleValues:PainScale[]=[
  {name:'noPain',color:'#308A45'},
  {name:'mild',color:'#91BE32'},
  {name:'moderate',color:'#F3F320'},
  {name:'severe',color:'#F3B210'},
  {name:'verySevere',color:'#F37100'},
  {name:'worstPain',color:'#D30000'},
];
NextButtonDisabled:boolean=true;

constructor(private __SharedService:SharedService){}
ngOnInit(): void {
      this.stortedPainScale=this.__SharedService.getGenericStoredDataValue('painScale');
      if(this.stortedPainScale.name && this.stortedPainScale.color) {
          this.painLevel=this.stortedPainScale.name;
          this.selectedColor=this.stortedPainScale.color;
          this.NextButtonDisabled=false;
      }
      this.painScale=   this.stortedPainScale;
}

scalePain(painLevel: string) {
  this.NextButtonDisabled=false;
  this.painLevel=painLevel;
  const level=(this.painScaleValues.filter(level => level.name == painLevel))[0];
  this.selectedColor=level.color;
  this.painScale=level;
}
}
