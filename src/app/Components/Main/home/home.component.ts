import { LanguageService } from '../../../Services/language/language.service';
import { Language } from '../../../Interfaces/language';
import {  Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { StyleService } from '../../../Services/style/style.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
 languages:Language[]=[];
 disabled:boolean=true;
 languages$:Observable<Language[]>;
 ChooseLanguage: string = 'Choose a Language';

 constructor(private __LanguageService:LanguageService,
  private __TranslationService:TranslateService,
  private __StyleService:StyleService, 
  private __Router:Router)
  {
      this.languages$ =this.__LanguageService.getLanguages();
 }

 onLanguageChoose(selectedLanguage:string){
      const isRTL:boolean=this.__StyleService.isRtl(selectedLanguage);
      this.__StyleService.switchStyleToRTL(isRTL,selectedLanguage);
      this.__TranslationService.use(selectedLanguage); // Switch language
      localStorage.setItem('lang',selectedLanguage);
      this.disabled=false;
 }

 navigateToChooseFlag(){
     this.__Router.navigate(['/Choose_Flag']);
 }

}




