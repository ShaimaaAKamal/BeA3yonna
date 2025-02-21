import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { PatientReportData } from '../../Interfaces/patient-report-data';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private __HttpClient:HttpClient,private __Router:Router) { }

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

  // getDefaultValue(key:string){
  //  if(key == 'AssessmentInfo')
  //     return { Examiner_Name:'', Examination_Location:'',Treatment_Location:''}
  //  else if(key == 'patientHistory')
  //     return { complainTime:'', lastMealTime:''}
  //  else if(key == 'patientInitialVitals')
  //     return { haveAllergy: "",haveInfectiousDiseases: "",havePeramentDiseases:"",presubscribedMedication: ""}
  //   else if(key == 'painedParts' || 'Symptoms' ||'PermanentDiseases')
  //     return [];
  //   else if(key == 'painScale')
  //     return {name:'',color:'',textColor:''};
  //     else if(key == 'CountrycurrentPage')
  //     return 1;
  //    else if(key == 'patientInfo')
  //     return { name:'', age:'',gender:''}
  //    else if(key == 'additionalPatientInfo')
  //     return { pregnant: '', havePeriod:'', additionalInfo:''}
  //     else if(key == 'Country')
  //     return  { name:'',flags:{},languages:{}}
  //   else if(key == 'patientVitals')
  //       return {Weight:'',Height: '',Temperature: '',Blood_Pressure: '',Oxgyen_Rate: '',Blood_Sugar: '',Heart_Rate: '',Breathe_Rate: '',}
  //   else if(key == 'lang')
  //       return 'en'
  //   else if(key == 'language')
  //       return 'english'
  //   else return '';
  // }
  getDefaultValue(key: string) {
    switch (key) {
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
            return { name: '', age: '', gender: '' };
        case 'additionalPatientInfo':
            return { pregnant: '', havePeriod: '', additionalInfo: '' };
        case 'Country':
            return { name: '', flags: {}, languages: {} };
        case 'patientVitals':
            return { Weight: '', Height: '', Temperature: '', Blood_Pressure: '', Oxygen_Rate: '', Blood_Sugar: '', Heart_Rate: '', Breathe_Rate: '' };
        case 'lang':
            return 'en';
        case 'language':
            return 'english';
        default:
            return '';
    }
}

  navigateToPage(pageUrl:string){
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
}
