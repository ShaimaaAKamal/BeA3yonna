import { Component, HostListener } from '@angular/core';
import { PatientVitals } from '../../../../Interfaces/patient-vitals';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { PatientHistory } from '../../../../Interfaces/patient-history';
import { PatientInfo } from '../../../../Interfaces/patient-info';
import { PatientAdditionalInfo } from '../../../../Interfaces/patient-additional-info';
import { PatientInitialVitals } from '../../../../Interfaces/patient-initial-vitals';
import { AssessmentInfo } from '../../../../Interfaces/assessment-info';
import { PainScale } from '../../../../Interfaces/pain-scale';
import { PatientReportData } from '../../../../Interfaces/patient-report-data';

@Component({
  selector: 'app-final-report',
  standalone: false,
  
  templateUrl: './final-report.component.html',
  styleUrl: './final-report.component.css'
})
export class FinalReportComponent {
patientReportData!:PatientReportData;
patientVitals!:PatientVitals;
patientVitalsKeys!:string[];
isSmallScreen: boolean = false;
isLargeScreen: boolean = false;
fullPatientHistory:any;
fullPatientHistoryBeforeRename:any;
symptoms!:string[];
permanentDiseases!:string[];
 painLevel!:PainScale;
fullAssesmentData:any;
constructor(private __SharedService:SharedService){}

  @HostListener('window:resize', ['$event'])
   onResize() {
    this.isSmallScreen = window.innerWidth < 1200;
    this.isLargeScreen = window.innerWidth < 1200 && window.innerWidth < 992;
  }

ngOnInit(): void {
  this.onResize(); 
  this.patientReportData=this.__SharedService.getAllLocalStorage();
  this.patientVitals=this.patientReportData['patientVitals'];
  this.painLevel=this.patientReportData['painScale'];
  this.fullPatientHistory=this.getPatientHistory();
  this.fullPatientHistoryBeforeRename=this.fullPatientHistory;
  this.symptoms=this.patientReportData['Symptoms'];
  this.permanentDiseases=this.patientReportData['PermanentDiseases'];
  this.fullAssesmentData=this.getAssessmentInfo();

    // Define a mapping of old keys to new keys
  const keyMappings: { [key: string]: string } = {
    complainTime: "Pain Duration",
    haveAllergy: "Has Allergy",
    haveInfectiousDiseases: "Contagious Condition",
    havePeramentDiseases: "Permanent Condition",
    havePeriod: "In Period",
    lastMealTime: "Last Meal Time",
    pregnant: "Pregnancy Status",
    additionalInfo:"More Info",
    presubscribedMedication:'Medication'
  };
  
  this.fullPatientHistory = this.renameKeys(this.fullPatientHistory, keyMappings);
  
}

getPatientHistory(){
  const patientHistory:PatientHistory=this.patientReportData['patientHistory'];
  const patientInitialVitals:PatientInitialVitals=this.patientReportData['patientInitialVitals'];
  const patientAdditionalInfo:PatientAdditionalInfo=this.patientReportData['additionalPatientInfo'];
  const fullPatientHistory:any={...patientAdditionalInfo,...patientInitialVitals,...patientHistory};
  return fullPatientHistory;
}

getAssessmentInfo(){
    const AssessmentInfo:AssessmentInfo=this.__SharedService.getGenericStoredDataValue('AssessmentInfo');
    return {...AssessmentInfo,"Patient Pain Level":this.painLevel.name}
}


getObjectKeys(obj:object): string[] {
    return Object.keys(obj);
  }

renameKeys(obj: any, keyMap: { [key: string]: string }): any {
  return Object.keys(obj).reduce((newObj: any, key: string) => {
    const newKey = keyMap[key] || key; 
    if(newKey == "More Info" || newKey == "Medication") 
      return newObj;
    newObj[newKey] = obj[key];
    return newObj;
  }, {});}

getTodayDate(){
        return new Intl.DateTimeFormat('en-GB').format(new Date(Date.now()));
  }

  
}
  
