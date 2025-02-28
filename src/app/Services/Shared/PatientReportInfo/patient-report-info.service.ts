import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PatientReportData } from '../../../Interfaces/patient-report-data';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class PatientReportInfoService implements OnInit{
  // emptyReport:PatientReportData={
  //   AssessmentInfo:{ Examiner_Name: '', Examination_Location: '', Treatment_Location: '' },
  //   Country:{ name: '', flags: {}, languages: {} },
  //   CountrycurrentPage:1,
  //   PermanentDiseases:[],
  //   Symptoms:[],
  //   additionalPatientInfo:{ pregnant: '', havePeriod: '', additionalInfo: '' } ,
  //   lang:'en', 
  //   language: 'english',
  //   painScale:{ name: '', color: '', textColor: '' },
  //   painedParts:[],
  //   patientHistory:{ complainTime: '', lastMealTime: '' },
  //   patientInfo: { name: '', age: 10, gender: ''},
  //   patientInitialVitals:{ haveAllergy: "", haveInfectiousDiseases: "", havePeramentDiseases: "", presubscribedMedication: "" },
  //   patientVitals:{ Weight: '', Height: '', Temperature: '', 'Blood Pressure': '','Oxygen Rate': '', 'Blood Sugar': '', 'Heart Rate': '', 'Breathe Rate': '' }
  // };
  patientReport!:Observable<PatientReportData>
  
  constructor(private __SharedService:SharedService) { }
  
  ngOnInit(): void {
    this.patientReport=new BehaviorSubject<PatientReportData>(this.__SharedService.getGenericStoredDataValue('patientReport'));
  }
}
