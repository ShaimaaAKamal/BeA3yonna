import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Main/home/home.component';
import { ChooseFlagComponent } from './Components/Main/choose-flag/choose-flag.component';
import { PatientInfoComponent } from './Components/Main/PatientInfo/patient-info/patient-info.component';
import { AdditionalPatientInfoComponent } from './Components/Main/additional-patient-info/additional-patient-info.component';

const routes: Routes = [
    { path: '', component: HomeComponent ,pathMatch:'full'},
    { path: 'Choose_Flag', component: ChooseFlagComponent},
    { path: 'Patient_Info', component: PatientInfoComponent},
    { path: 'Addtional_Patient_Info', component: AdditionalPatientInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
