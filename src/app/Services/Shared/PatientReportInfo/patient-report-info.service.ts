import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PatientReportData } from '../../../Interfaces/patient-report-data';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class PatientReportInfoService {

  patientReport!:BehaviorSubject<PatientReportData>
  patientReports!:PatientReportData[];
  constructor(private __SharedService:SharedService) {
        this.patientReport=new BehaviorSubject<PatientReportData>(this.__SharedService.getGenericStoredDataValue('patientReport'));
        this.patientReports=this.__SharedService.getStoredDataValue('patientReports');
   }
  
addNewPatientReport(report:PatientReportData){
  this.patientReports.push(report);
  this.__SharedService.saveItemInLocalStorage('patientReports',JSON.stringify(this.patientReports));
}

  updatePatientDataByKey(keys: string[], values: any[]): void {
  const currentData: PatientReportData = this.patientReport.value;
  const updatedData: PatientReportData = keys.reduce(
    (acc, key, index) => ({ ...acc, [key]: values[index] }),
    { ...currentData }
  );
  this.patientReport.next(updatedData);
  this.__SharedService.saveItemInLocalStorage('patientReport', JSON.stringify(updatedData));
}

  getPatientLanguage(){
   const currentData:PatientReportData= this.patientReport.value;
   return {
    lang:currentData['lang'],
    language:currentData['language']
   }
  }
  getPatientFieldValueByKey(key:string){
 const currentData:PatientReportData= this.patientReport.value;
 if(typeof currentData[key]  == 'string' && !['lang','language'].includes(key))
     return JSON.parse(currentData[key]);
else  return currentData[key];
  }
  getReportData(){
  const patientReportData = this.patientReport.value; 
const updatedPatientReport: PatientReportData = {
  ...patientReportData,
  ...Object.fromEntries(
    Object.keys(patientReportData).map(key => { return [key,this.getPatientFieldValueByKey(key)]})
  )
};
  return updatedPatientReport;
  }
}
