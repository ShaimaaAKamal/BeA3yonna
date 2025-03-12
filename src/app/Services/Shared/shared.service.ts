import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { PatientReportData } from '../../Interfaces/patient-report-data';
import { PatientVitals } from '../../Interfaces/patient-vitals';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  vitalUnits:PatientVitals= {
  Weight: 'Kg',
  Height: 'Cm',
  Temperature: 'deg',
  'Blood Pressure': 'mmHg',
  'Oxygen Rate': '%',
  'Blood Sugar': 'mg/dL',
  'Heart Rate': 'bpm',
  'Breathe Rate': 'bpm'
};
  constructor(private __HttpClient:HttpClient,
    private __Router:Router) { }

  sendGetRequest(url:string):Observable<any>{
    return this.__HttpClient.get(url);
  }
  sendPostRequest(url: string, body: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.__HttpClient.post(url, body, { headers }).pipe(
      catchError(error => {
        console.error('Error in sendPostRequest:', error);
        return of(null); // Return null or any other fallback value in case of error
      })
    );
  }
  saveItemInLocalStorage(key:string,value:string){
    localStorage.setItem(key,value);
  }
  getItemFromLocalStorage(key:string):string{
    return localStorage.getItem(key) ?? '';
  }
  getStoredDataValue(key:string){
    let storedData;
    storedData=this.getItemFromLocalStorage(key)?JSON.parse(this.getItemFromLocalStorage(key)):[];
    return storedData;
  }
   getGenericStoredDataValue(key:string){
    let storedData;
    if(!(['lang','language'].includes(key)))
          storedData=(this.getItemFromLocalStorage(key))?JSON.parse(this.getItemFromLocalStorage(key)):this.getDefaultValue(key);
    else
            storedData=(this.getItemFromLocalStorage(key));
    return storedData;
  }


  getDefaultValue(key: string):any {
    switch (key) {
        case 'patientReport':
          return {
                    AssessmentInfo:{ Examiner_Name: '', Examination_Location: '', Treatment_Location: '' },
                    Country:{ name: '', flags: {}, languages: {} },
                    CountrycurrentPage:1,
                    PermanentDiseases:[],
                    Symptoms:[],
                    additionalPatientInfo:{ pregnant: '', havePeriod: '', additionalInfo: '' } ,
                    lang:'',
                    language: '',
                    painScale:{ name: '', color: '', textColor: '' },
                    painedParts:[],
                    patientHistory:{ complainTime: '', lastMealTime: '' },
                    patientInfo: { name: '', age:'', gender: ''},
                    patientInitialVitals:{ haveAllergy: "", haveInfectiousDiseases: "", havePeramentDiseases: "", presubscribedMedication: "" },
                    patientVitals:{ Weight: '', Height: '', Temperature: '', 'Blood Pressure': '','Oxygen Rate': '', 'Blood Sugar': '', 'Heart Rate': '', 'Breathe Rate': '' }
                  };
        case 'AssessmentInfo':
            return { Examiner_Name: '', Examination_Location: '', Treatment_Location: '' };
        case 'patientHistory':
            return { complainTime: '', lastMealTime: '' };
        case 'patientInitialVitals':
            return { haveAllergy: "", haveInfectiousDiseases: "", havePeramentDiseases: "", presubscribedMedication: "" };
        case 'painedParts':
        case 'Symptoms':
        case 'PermanentDiseases':
            return [];
        case 'painScale':
            return { name: '', color: '', textColor: '' };
        case 'CountrycurrentPage':
            return 1;
        case 'patientInfo':
            return { name: '', age: 10, gender: '' };
        case 'additionalPatientInfo':
            return { pregnant: '', havePeriod: '', additionalInfo: '' };
        case 'Country':
            return { name: '', flags: {}, languages: {} };
        case 'patientVitals':
            return { Weight: '', Height: '', Temperature: '', 'Blood Pressure': '', 'Oxygen Rate': '', 'Blood Sugar': '', 'Heart Rate': '', 'Breathe Rate': '' };
        case 'lang':
            return 'en';
        case 'language':
            return 'english';
        default:
            return '';
    }
}
  navigateToPage(pageUrl:string){
    sessionStorage.setItem('internalNavigation', 'true');
    this.__Router.navigate([pageUrl])
  }

getAllLocalStorage(): PatientReportData {
  let storageData!:PatientReportData
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key != 'patientReport') {
      storageData = {
        ...storageData,
        [key]: this.getGenericStoredDataValue(key)
      };
    }
  }
  return storageData;
}
clearLocalStorage(){
  localStorage.clear();
}
removeItemFromLocalStorage(key:string){
localStorage.removeItem(key);
}
getSiteLanguage(){
 return  this.getItemFromLocalStorage('lang');
}


displayStoryedPainedParts(pathsArray:any,Data:any){
  pathsArray.forEach((path:any,index:number) => {
      const existedIndex = Data['painedParts'].indexOf(index);
      if(existedIndex != -1){
          path.setAttribute('fill','red');
      }
});}


renameKeys(obj: any, keyMap: { [key: string]: string },ExcludedKeys:string[]): any {
    return Object.keys(obj).reduce((newObj: any, key: string) => {
      const newKey = keyMap[key] || key;
      if(ExcludedKeys.includes(newKey))
        return newObj;
      newObj[newKey] = obj[key];
      return newObj;
    }, {});}

 getPageSize(pageSize:number):number{
    if(window.innerWidth <576)
          pageSize=4
        else  if(window.innerWidth <768)
          pageSize=6
        else  if(window.innerWidth <992)
          pageSize=8
        else  if(window.innerWidth <1200)
          pageSize=12
        else  pageSize=24
      return pageSize
 }
 getCurrentPage(index:number,pageSize:number):number{
     const pageNumberCalculateDivation = (index + 1) / pageSize;
        const pageNumberCalculateReminder = (index + 1) %pageSize;

        return pageNumberCalculateReminder > 0
          ? Math.ceil(pageNumberCalculateDivation)
          : pageNumberCalculateDivation;
 }

}
