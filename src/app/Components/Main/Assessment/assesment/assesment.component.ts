import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { AssessmentInfo } from '../../../../Interfaces/assessment-info';
import { LiveTranslationsService } from '../../../../Services/LiveTranslationService/live-translations.service';

@Component({
  selector: 'app-assesment',
  standalone: false,
  
  templateUrl: './assesment.component.html',
  styleUrl: './assesment.component.css'
})
export class AssesmentComponent implements OnInit{
patientAssessmentInfo!:FormGroup;
storedpatientAssessmentInfo!:AssessmentInfo;
 textsToTranslate:string[]=[
  'Case evaluation information',
  "Examiner Name",
  'Name is required','Minimum 3 characters required','Examination Location',
  'Examination_Location is required','At Examination Point','Nearest Medical Center',
  'Nearest Hospital','Treatment Location'
 ]
constructor(private __SharedService:SharedService,private __LiveTranslationsService:LiveTranslationsService){}

ngOnInit(): void {
        this.__LiveTranslationsService.loadTranslations(this.__SharedService.getSiteLanguage(),this.textsToTranslate);
      this.storedpatientAssessmentInfo=this.__SharedService.getGenericStoredDataValue('AssessmentInfo');
      this.patientAssessmentInfo = new FormGroup({
      Examiner_Name: new FormControl(this.storedpatientAssessmentInfo?.Examiner_Name ?? '',[Validators.required, Validators.minLength(3)]),
      Examination_Location: new FormControl(this.storedpatientAssessmentInfo?.Examination_Location ?? '',[Validators.required]),
      Treatment_Location: new FormControl(this.storedpatientAssessmentInfo?.Treatment_Location ?? '', [Validators.required]),
    });
}

}
