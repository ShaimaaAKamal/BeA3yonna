import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

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
    storedData=this.getItemFromLocalStorage(key)?JSON.parse(this.getItemFromLocalStorage(key)):this.getDefaultValue(key);
    return storedData;
  }
  getDefaultValue(key:string){
   if(key == 'AssessmentInfo')
      return { Examiner_Name:'', Examination_Location:'',Treatment_Location:''}
   else if(key == 'patientHistory')
      return { complainTime:'', lastMealTime:''}
   else if(key == 'patientInitialVitals')
      return { haveAllergy: "",haveInfectiousDiseases: "",havePeramentDiseases:"",presubscribedMedication: ""}
    else if(key == 'painedParts' || 'Symptoms' ||'PermanentDiseases')
      return [];
    else if(key == 'painScale')
      return {name:'',color:''};
      else if(key == 'CountrycurrentPage')
      return 1;
     else if(key == 'patientInfo')
      return { name:'', age:'',gender:''}
     else if(key == 'additionalPatientInfo')
      return { pregnant: '', havePeriod:'', additionalInfo:''}
      else if(key == 'Country')
      return  { name:'',flags:{},languages:{}}
    else if(key == 'patientVitals')
        return {Weight:'',Height: '',Temperature: '',Blood_Pressure: '',Oxgyen_Rate: '',Blood_Sugar: '',Heart_Rate: '',Breathe_Rate: '',}
      
    
    else return '';
  }
  navigateToPage(pageUrl:string){
    this.__Router.navigate([pageUrl])
  }
}
