import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/shared/navbar/navbar.component';
import { FooterComponent } from './Components/shared/footer/footer.component';
import { FlagCardComponent } from './Components/Main/flag-card/flag-card.component';
import { SymptomCardComponent } from './Components/Main/symptom-card/symptom-card.component';
import { HomeComponent } from './Components/Main/home/home.component';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Select2Directive } from './Dirctives/select2.directive';
import { ButtonWithIconComponent } from './Components/shared/button-with-icon/button-with-icon.component';
import { BackButtonComponent } from './Components/shared/back-button/back-button.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChooseFlagComponent } from './Components/Main/choose-flag/choose-flag.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientInfoComponent } from './Components/Main/PatientInfo/patient-info/patient-info.component';
import { AdditionalPatientInfoComponent } from './Components/Main/additional-patient-info/additional-patient-info.component';
import { PatientInitialVitalsComponent } from './Components/Main/PatientInitialVitals/patient-initial-vitals/patient-initial-vitals.component';
import { PatientVitalsComponent } from './Components/Main/PatientVitals/patient-vitals/patient-vitals.component';
import { ChooseSymptomsComponent } from './Components/Main/ChooseSymptoms/choose-symptoms/choose-symptoms.component';
import { RatePainComponent } from './Components/Main/RatePain/rate-pain/rate-pain.component';
import { PainedBodyPartComponent } from './Components/Main/PainedBodyPart/pained-body-part/pained-body-part.component';
import { PermanentDiseasesComponent } from './Components/Main/PermanentDiseases/permanent-diseases/permanent-diseases.component';
import { PatientComplainDetailsComponent } from './Components/Main/PatientComplainDetails/patient-complain-details/patient-complain-details.component';
import { AssesmentComponent } from './Components/Main/Assessment/assesment/assesment.component';
import { ReportComponent } from './Components/Main/Report/report/report.component';
import { NotFoundComponent } from './Components/Errors/NotFound/not-found/not-found.component';
import { NavigationButtonsComponent } from './Components/shared/NavigationButtons/navigation-buttons/navigation-buttons.component';
import { DisplaySymptomsComponent } from './Components/shared/DisplaySymptoms/display-symptoms/display-symptoms.component';
import { PatientHeaderComponent } from './Components/shared/PatientHeader/patient-header/patient-header.component';
import { PaginationComponent } from './Components/shared/Pagination/pagination/pagination.component';
import { TranslationCacheInterceptor } from './Interceptors/Translation/translation.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http, './assets/i18n/', '.json');
    return new TranslateHttpLoader(http);

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
    PatientInitialVitalsComponent,
    PatientVitalsComponent,
    ChooseSymptomsComponent,
    NavigationButtonsComponent,
    RatePainComponent,
    PainedBodyPartComponent,
    PermanentDiseasesComponent,
    DisplaySymptomsComponent,
    PatientComplainDetailsComponent,
    AssesmentComponent,
    PatientHeaderComponent,
    ReportComponent,
    NotFoundComponent,
    PaginationComponent,
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
      provideHttpClient(withInterceptorsFromDi()),
      { provide: HTTP_INTERCEPTORS, useClass: TranslationCacheInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
