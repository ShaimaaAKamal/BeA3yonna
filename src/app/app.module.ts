import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/shared/navbar/navbar.component';
import { FooterComponent } from './Components/shared/footer/footer.component';
import { FlagCardComponent } from './Components/Main/flag-card/flag-card.component';
import { SymptomCardComponent } from './Components/Main/symptom-card/symptom-card.component';
import { HomeComponent } from './Components/Main/home/home.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Select2Directive } from './Dirctives/select2.directive';
import { ButtonWithIconComponent } from './Components/shared/button-with-icon/button-with-icon.component';
import { BackButtonComponent } from './Components/shared/back-button/back-button.component';

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
    Select2Directive
  ],
  providers: [
      provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
