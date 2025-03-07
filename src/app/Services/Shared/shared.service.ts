import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { PatientReportData } from '../../Interfaces/patient-report-data';
import { PatientVitals } from '../../Interfaces/patient-vitals';
import { TranslateService } from '@ngx-translate/core';
import { LiveTranslationsService } from '../LiveTranslationService/live-translations.service';

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
  constructor(private __HttpClient:HttpClient,private __Router:Router,private __LiveTranslationsService:LiveTranslationsService) { }

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
                    // lang:'en', 
                    // language: 'english',
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

// formatPatientVitalsValuesByAddingUnits(patientVitals:PatientVitals):PatientVitals{
// const Units:PatientVitals= {
//   Weight: ' Kg',
//   Height: ' Cm',
//   Temperature: ' deg',
//   'Blood Pressure': ' mmHg',
//   'Oxygen Rate': ' %',
//   'Blood Sugar': ' mg/dL',
//   'Heart Rate': ' bpm',
//   'Breathe Rate': ' bpm'
// };

// // Update values based on the substring mapping
//   const updatedObj = Object.keys(Units).reduce((acc, key) => {
//     acc[key as keyof PatientVitals] = patientVitals[key as keyof PatientVitals] 
//       ? `${patientVitals[key as keyof PatientVitals]}${Units[key as keyof PatientVitals]}`
//       : '';
//     return acc;
//   }, {} as PatientVitals);
// return updatedObj;
//  }
// formatPatientVitalsValuesByAddingUnits(patientVitals: PatientVitals, targetLang: string): Observable<PatientVitals> {
//   const units: { [key: string]: string } = {
//     Weight: 'Kg',
//     Height: 'Cm',
//     Temperature: 'deg',
//     'Blood Pressure': 'mmHg',
//     'Oxygen Rate': '%',
//     'Blood Sugar': ' mg/dL',
//     'Heart Rate': ' BPM',
//     'Breathe Rate': ' BPM'
//   };

//   const translationObservables = Object.keys(units).map((key) => 
//     this.__LiveTranslationsService.translateText(units[key], targetLang).pipe(
//       map((translatedUnit) => ({ key, translatedUnit }))
//     )
//   );

//   return forkJoin(translationObservables).pipe(
//     map((translatedUnitsArray) => {
//       const translatedUnits: { [key: string]: string } = {};
//       translatedUnitsArray.forEach(({ key, translatedUnit }) => {
//         translatedUnits[key] = translatedUnit;
//       });

//       const formattedVitals: PatientVitals = { ...patientVitals };
//       for (const key in formattedVitals) {
//         if (translatedUnits[key] && formattedVitals[key] !== undefined) {
//           formattedVitals[key] += ` ${translatedUnits[key]}`;
//         }
//       }
//       return formattedVitals;
//     })
//   );
// }

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

  
}
