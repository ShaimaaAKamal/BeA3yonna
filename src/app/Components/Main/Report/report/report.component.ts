import { AssessmentInfo } from './../../../../Interfaces/assessment-info';
import { Component, HostListener } from '@angular/core';
import { PatientReportData } from '../../../../Interfaces/patient-report-data';
import { PatientVitals } from '../../../../Interfaces/patient-vitals';
import { PainScale } from '../../../../Interfaces/pain-scale';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { PatientHistory } from '../../../../Interfaces/patient-history';
import { PatientInitialVitals } from '../../../../Interfaces/patient-initial-vitals';
import { PatientAdditionalInfo } from '../../../../Interfaces/patient-additional-info';
import { PatientReportInfoService } from '../../../../Services/Shared/PatientReportInfo/patient-report-info.service';

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
  isMediumScreen: boolean = false;
  fullPatientHistory:any;
  fullPatientHistoryBeforeRename:any;
  symptoms!:string[];
  permanentDiseases:string[]=[];
  painLevel!:PainScale;
  fullAssesmentData:any;
  vitalUnits!:PatientVitals;

  constructor(private __SharedService:SharedService,private __PatientReportInfoService:PatientReportInfoService){}

    @HostListener('window:resize', ['$event'])
     onResize() {
      this.isMediumScreen = window.innerWidth < 1200 && window.innerWidth > 768 ;
      this.isSmallScreen = window.innerWidth < 768;
    }

  ngOnInit(): void {
    this.vitalUnits=this.__SharedService.vitalUnits;
    this.onResize();
    this.loadPatientData();
    this.renamePatientHistoryKeys();
    this.__SharedService.displayStoryedPainedParts(
      Array.from(document.getElementsByTagName('path')),
      this.patientReportData);
  }

  private loadPatientData(): void {
    this.patientReportData = this.__PatientReportInfoService.getReportData();
    this.patientVitals = this.patientReportData.patientVitals;
    this.painLevel = this.patientReportData.painScale;
    this.symptoms = this.patientReportData.Symptoms;
    this.permanentDiseases = this.patientReportData.PermanentDiseases;
    this.fullPatientHistory = this.getPatientHistory();
    this.fullPatientHistoryBeforeRename = { ...this.fullPatientHistory };
    this.fullAssesmentData = this.getAssessmentInfo();
  }


  private renamePatientHistoryKeys(): void {
    const keyMappings: Record<string, string> = {
      complainTime: 'Pain Duration',
      haveAllergy: 'Has Allergy',
      haveInfectiousDiseases: 'Contagious Condition',
      havePeramentDiseases: 'Permanent Condition',
      havePeriod: 'In Period',
      lastMealTime: 'Last Meal Time',
      pregnant: 'Pregnancy Status',
      additionalInfo: 'More Info',
      presubscribedMedication: 'Medication',
    };
    this.fullPatientHistory = this.__SharedService.renameKeys(
      this.fullPatientHistory,
      keyMappings,
      ['More Info', 'Medication']
    );
  }

  private getPatientHistory(){
    const { patientHistory, patientInitialVitals, additionalPatientInfo } =
      this.patientReportData;
    return { ...additionalPatientInfo, ...patientInitialVitals, ...patientHistory };
  }

  getAssessmentInfo(){
            const AssessmentInfo:AssessmentInfo=this.__PatientReportInfoService.getPatientFieldValueByKey('AssessmentInfo');

      return {...AssessmentInfo,"Patient Pain Level":this.painLevel.name}
  }


  getObjectKeys(obj:object): string[] {
      return Object.keys(obj);
    }

  getTodayDate(){
  const lang=this.__PatientReportInfoService.getPatientLanguage().lang;
  return new Intl.DateTimeFormat(lang, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    numberingSystem: lang === 'ar' ? 'arab' : 'latn' // Force Arabic or Western numerals
  }).format(new Date());
    }


}
