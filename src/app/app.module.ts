import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/shared/navbar/navbar.component';
import { FooterComponent } from './Components/shared/footer/footer.component';
import { FlagCardComponent } from './Components/Main/flag-card/flag-card.component';
import { SymptomCardComponent } from './Components/Main/symptom-card/symptom-card.component';
import { HomeComponent } from './Components/Main/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    FlagCardComponent,
    SymptomCardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
