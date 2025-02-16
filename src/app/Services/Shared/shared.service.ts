import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private __HttpClient:HttpClient) { }

  sendGetRequest(url:string):Observable<any>{
    return this.__HttpClient.get(url);
  }
  saveItemInLocalStorage(key:string,value:string){
    localStorage.setItem(key,value);
  }
}
