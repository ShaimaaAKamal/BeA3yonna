import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private __HttpClient:HttpClient,private __Router:Router) { }

  sendGetRequest(url:string):Observable<any>{
    return this.__HttpClient.get(url);
  }
  saveItemInLocalStorage(key:string,value:string){
    localStorage.setItem(key,value);
  }
  getItemFromLocalStorage(key:string):string{
    return localStorage.getItem(key) ?? '';
  }
  navigateToPage(pageUrl:string){
    this.__Router.navigate([pageUrl])
  }
}
