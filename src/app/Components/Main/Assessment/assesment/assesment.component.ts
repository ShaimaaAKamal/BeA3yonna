import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssessmentInfo } from '../../../../Interfaces/assessment-info';
import { PatientReportInfoService } from '../../../../Services/Shared/PatientReportInfo/patient-report-info.service';

@Component({
  selector: 'app-assesment',
  standalone: false,
  
  templateUrl: './assesment.component.html',
  styleUrl: './assesment.component.css'
})
export class AssesmentComponent implements OnInit{
patientAssessmentInfo!:FormGroup;
storedpatientAssessmentInfo!:AssessmentInfo;

constructor(private __PatientReportInfoService:PatientReportInfoService){}

ngOnInit(): void {
      this.storedpatientAssessmentInfo=this.__PatientReportInfoService.getPatientFieldValueByKey('AssessmentInfo');
      this.patientAssessmentInfo = new FormGroup({
      Examiner_Name: new FormControl(this.storedpatientAssessmentInfo?.Examiner_Name ?? '',[Validators.required, Validators.minLength(3)]),
      Examination_Location: new FormControl(this.storedpatientAssessmentInfo?.Examination_Location ?? '',[Validators.required]),
      Treatment_Location: new FormControl(this.storedpatientAssessmentInfo?.Treatment_Location ?? '', [Validators.required]),
    });
}

}
