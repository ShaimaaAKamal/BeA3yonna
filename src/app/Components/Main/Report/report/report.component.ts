import { AssessmentInfo } from './../../../../Interfaces/assessment-info';
import { Component, HostListener } from '@angular/core';
import { PatientReportData } from '../../../../Interfaces/patient-report-data';
import { PatientVitals } from '../../../../Interfaces/patient-vitals';
import { PainScale } from '../../../../Interfaces/pain-scale';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { PatientHistory } from '../../../../Interfaces/patient-history';
import { PatientInitialVitals } from '../../../../Interfaces/patient-initial-vitals';
import { PatientAdditionalInfo } from '../../../../Interfaces/patient-additional-info';

@Component({
  selector: 'app-report',
  standalone: false,
  
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {

  patientReportData!:PatientReportData;
  patientVitals!:PatientVitals;
  patientVitalsKeys!:string[];
  isSmallScreen: boolean = false;
  isLargeScreen: boolean = false;
  fullPatientHistory:any;
  fullPatientHistoryBeforeRename:any;
  symptoms!:string[];
  permanentDiseases:string[]=[];
  painLevel!:PainScale;
  fullAssesmentData:any;


  constructor(private __SharedService:SharedService){}
  
    @HostListener('window:resize', ['$event'])
     onResize() {
      this.isSmallScreen = window.innerWidth < 1200;
      this.isLargeScreen = window.innerWidth < 1200 && window.innerWidth < 578;
    }
  
  ngOnInit(): void {
    this.onResize(); 
    this.patientReportData=this.__SharedService.getAllLocalStorage();
    this.patientVitals=this.patientReportData['patientVitals'];
    this.patientVitals=this.__SharedService.formatPatientVitalsValuesByAddingUnits(this.patientVitals);
    this.painLevel=this.patientReportData['painScale'];
    this.fullPatientHistory=this.getPatientHistory();
    this.fullPatientHistoryBeforeRename=this.fullPatientHistory;
    this.symptoms=this.patientReportData['Symptoms'];
    this.permanentDiseases=this.patientReportData['PermanentDiseases'];
    this.fullAssesmentData=this.getAssessmentInfo();
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
    this.fullPatientHistory = this.__SharedService.renameKeys(this.fullPatientHistory, keyMappings,['More Info','Medication']);
    this.__SharedService.displayStoryedPainedParts(Array.from(document.getElementsByTagName('path')),this.patientReportData);
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
  
  getTodayDate(){
          return new Intl.DateTimeFormat('en-GB').format(new Date(Date.now()));
    }

}
