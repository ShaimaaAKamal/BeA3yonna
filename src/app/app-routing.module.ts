import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Main/home/home.component';
import { ChooseFlagComponent } from './Components/Main/choose-flag/choose-flag.component';
import { PatientInfoComponent } from './Components/Main/PatientInfo/patient-info/patient-info.component';
import { AdditionalPatientInfoComponent } from './Components/Main/additional-patient-info/additional-patient-info.component';
import { PatientInitialVitalsComponent } from './Components/Main/PatientInitialVitals/patient-initial-vitals/patient-initial-vitals.component';
import { PatientVitalsComponent } from './Components/Main/PatientVitals/patient-vitals/patient-vitals.component';

const routes: Routes = [
    { path: '', component: HomeComponent ,pathMatch:'full'},
    { path: 'Choose_Flag', component: ChooseFlagComponent},
    { path: 'Patient_Info', component: PatientInfoComponent},
    { path: 'Addtional_Patient_Info', component: AdditionalPatientInfoComponent},
    {path:'Patient_Initial_Vitals',component:PatientInitialVitalsComponent},
    {path:'Patient_Vitals',component:PatientVitalsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
