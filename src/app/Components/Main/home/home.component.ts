import { LanguageService } from '../../../Services/language/language.service';
import { Language } from '../../../Interfaces/language';
import {  Component } from '@angular/core';
import {  catchError, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { StyleService } from '../../../Services/style/style.service';
import { SharedService } from '../../../Services/Shared/shared.service';
import { Selec2 } from '../../../Interfaces/selec2';
import { LiveTranslationsService } from '../../../Services/LiveTranslationService/live-translations.service';

declare var window: any; // Global jQuery

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
 languages:Language[]=[];
 disabled:boolean=true;
 languages$!:Observable<Language[]>;
 ChooseLanguage: string = 'Choose a Language';
 chooseenLanguage:string='';
 constructor(private __LanguageService:LanguageService,
  private __TranslationService:TranslateService,
  private __StyleService:StyleService, 
  private __sharedService:SharedService,
  private __LiveTranslation:LiveTranslationsService,){}

 ngOnInit(): void {
  if(this.__sharedService.getSiteLanguage() == 'en' || !this.__sharedService.getSiteLanguage())
    this.languages$=this.__LanguageService.getLanguages();
  else
      this.languages$ =this.getLanguagesTranslation(this.__sharedService.getSiteLanguage());
 }


 onLanguageChoose(event:Selec2){
      const selectedLanguage=event.value
      this.chooseenLanguage=selectedLanguage;
      const isRTL:boolean=this.__StyleService.isRtl(selectedLanguage);
      this.__StyleService.switchStyleToRTL(isRTL,selectedLanguage);
      this.__TranslationService.use(selectedLanguage); // Switch language
      localStorage.setItem('lang',selectedLanguage);
      localStorage.setItem('language',event.text);
      if(selectedLanguage != 'en')
      {this.languages$ = this.getLanguagesTranslation(selectedLanguage);
      this.__LiveTranslation.loadTranslations(selectedLanguage);}
      this.disabled=false;
      
 }

 navigateToChooseFlag(){
     this.__sharedService.navigateToPage('/Choose_Flag');
 }

  getLanguagesTranslation(targetLang:string): Observable<Language[]> {
    // const targetLang=this.__sharedService.getSiteLanguage();
    // console.log('targetLang',targetLang);
      //  console.log(`Fetching languages from API...`); // Log API request start

       return this.__LanguageService.getLanguages().pipe(
      // tap(languages => console.log('Received languages:', languages)), // Log raw API response
      switchMap(languages => {
        if (!languages || languages.length === 0) {
          console.warn('No languages received from API');
          return of([]);
        }

        // Log each language before translation
        // console.log(`Translating ${languages.length} languages to '${targetLang}'...`);

        // Create translation requests for each language name
        const translationRequests = languages.map(lang =>
          this.__LiveTranslation.translateText(lang.name, targetLang).pipe(
            // tap(translatedName =>
            //   console.log(`Translated '${lang.name}' → '${translatedName}'`)
            // ),
            map(translatedName => ({
              ...lang,
                name: translatedName || lang.name, // Use original if translation fails
            })),
            catchError(error => {
              // console.log(lang);
              console.error(`Error translating '${lang.name}':`, error);
              return of({ ...lang, name: lang.name }); // Return original on failure
            })
          )
        );
        
        return forkJoin(translationRequests).pipe(
          tap(finalData => console.log('Final Translated Languages:', finalData))
        );
      }),
      catchError(error => {
        console.error('Error fetching languages from API:', error);
        return of([]);
      })
    );
  }

}




