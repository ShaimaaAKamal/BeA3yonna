import {  Component, OnInit} from '@angular/core';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { LiveTranslationsService } from '../../../../Services/LiveTranslationService/live-translations.service';

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
textsToTranslate:string[]=['Identify areas of pain'];

constructor(private __SharedService:SharedService,private __LiveTranslationsService:LiveTranslationsService){}

ngOnInit(): void {
this.__LiveTranslationsService.loadTranslations(this.__SharedService.getSiteLanguage(),this.textsToTranslate);
const paths=document.getElementsByTagName('path');
const pathsArray=Array.from(paths);
this.storedPainedParts=this.__SharedService.getGenericStoredDataValue('painedParts');
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
