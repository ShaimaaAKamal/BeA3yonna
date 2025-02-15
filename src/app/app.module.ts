import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/shared/navbar/navbar.component';
import { FooterComponent } from './Components/shared/footer/footer.component';
import { FlagCardComponent } from './Components/Main/flag-card/flag-card.component';
import { SymptomCardComponent } from './Components/Main/symptom-card/symptom-card.component';
import { HomeComponent } from './Components/Main/home/home.component';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Select2Directive } from './Dirctives/select2.directive';
import { ButtonWithIconComponent } from './Components/shared/button-with-icon/button-with-icon.component';
import { BackButtonComponent } from './Components/shared/back-button/back-button.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StyleService } from './Services/style/style.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    FlagCardComponent,
    SymptomCardComponent,
    HomeComponent,
    ButtonWithIconComponent,
    BackButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Select2Directive,
      TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en', // Set default language
    })
  ],
  providers: [
      provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(private __TranslateService: TranslateService,private __StyleService:StyleService) {
    this.__TranslateService.setDefaultLang('en'); // Default to English
    const savedLang = localStorage.getItem('lang') || 'en';
    this.__TranslateService.use(savedLang);
    const isRTL:boolean=(savedLang == 'ar')?true:false;
    this.__StyleService.switchStyleToRTL(isRTL,savedLang);
  }
}
