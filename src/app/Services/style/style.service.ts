import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor() { }
  
   switchStyleToRTL(isRTL: boolean,lang:string) {
    const head = document.getElementsByTagName('head')[0];
    let existingLink = document.getElementById('bootstrap-style') as HTMLLinkElement;

    if (existingLink) {
      head.removeChild(existingLink);
    }

    const newLink = document.createElement('link');
    newLink.id = 'bootstrap-style';
    newLink.rel = 'stylesheet';
    newLink.href = isRTL
      ? 'bootstrap-rtl.css'  // This will be bundled in Angular
      : 'bootstrap-ltr.css';  

    head.appendChild(newLink);
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', isRTL ? 'ar' : lang);

  }
}
