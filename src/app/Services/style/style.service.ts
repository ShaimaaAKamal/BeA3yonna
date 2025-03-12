import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private rtlLanguages:string[]=['ar', 'he', 'fa', 'ur'];
  constructor(private __TranslateService:TranslateService) { }

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
      ? 'bootstrap-rtl.css'
      : 'bootstrap-ltr.css';

    head.appendChild(newLink);
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang',lang);
  }

  isRtl(lang:string):boolean{
      return this.rtlLanguages.includes(lang) ?true:false;
  }

  setLanguageAndStyle(lang:string){
    console.log(lang);
      this.__TranslateService.use(lang);
      const isRTL:boolean=this.isRtl(lang);
      this.switchStyleToRTL(isRTL,lang);
    }

}
