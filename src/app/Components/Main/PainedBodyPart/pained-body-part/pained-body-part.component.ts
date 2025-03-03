import {  Component, OnInit} from '@angular/core';
import { PatientReportInfoService } from '../../../../Services/Shared/PatientReportInfo/patient-report-info.service';

@Component({
  selector: 'app-pained-body-part',
  standalone: false,
  
  templateUrl: './pained-body-part.component.html',
  styleUrl: './pained-body-part.component.css'
})
export class PainedBodyPartComponent implements OnInit{
NextButtonDisabled:boolean=true;
selectedPartsIndexes:number[]=[];
storedPainedParts:number[]=[];

constructor(private __PatientReportInfoService:PatientReportInfoService){}

ngOnInit(): void {
const paths=document.getElementsByTagName('path');
const pathsArray=Array.from(paths);
this.storedPainedParts=this.__PatientReportInfoService.getPatientFieldValueByKey('painedParts');

if(this.storedPainedParts) this.displayStoryedPainedParts(pathsArray);
pathsArray.forEach((path,index) => {
  path.addEventListener('click',()=>{
      const existedIndex = this.selectedPartsIndexes.indexOf(index);
      if(existedIndex != -1){
          path.setAttribute('fill','none');
          this.selectedPartsIndexes.splice(existedIndex,1);
      }
      else{
      path.setAttribute('fill','red');
      this.selectedPartsIndexes.push(index);
    }
    this.NextButtonDisabled=(this.selectedPartsIndexes.length !=0 )?false:true;
  })
});
}

displayStoryedPainedParts(pathsArray:any){
  pathsArray.forEach((path:any,index:number) => {
      const existedIndex = this.storedPainedParts.indexOf(index);
      if(existedIndex != -1){
          path.setAttribute('fill','red');
        this.selectedPartsIndexes.push(index);
      }
});
this.NextButtonDisabled=(this.selectedPartsIndexes.length !=0 )?false:true;
}
}
