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
import { ChooseFlagComponent } from './Components/Main/choose-flag/choose-flag.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientInfoComponent } from './Components/Main/PatientInfo/patient-info/patient-info.component';
import { AdditionalPatientInfoComponent } from './Components/Main/additional-patient-info/additional-patient-info.component'; 

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
    ChooseFlagComponent,
    PatientInfoComponent,
    AdditionalPatientInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Select2Directive,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
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
    localStorage.setItem('lang',savedLang);
    this.__TranslateService.use(savedLang);
    const isRTL:boolean=this.__StyleService.isRtl(savedLang);
    this.__StyleService.switchStyleToRTL(isRTL,savedLang);
  }
}
