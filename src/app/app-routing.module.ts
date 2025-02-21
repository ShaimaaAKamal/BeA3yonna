import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Main/home/home.component';
import { ChooseFlagComponent } from './Components/Main/choose-flag/choose-flag.component';
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
import { FinalReportComponent } from './Components/Main/FinalReport/final-report/final-report.component';
import { ReportComponent } from './Components/Main/Report/report/report.component';

const routes: Routes = [
    { path: '', component: HomeComponent ,pathMatch:'full'},
    { path: 'Choose_Flag', component: ChooseFlagComponent},
    { path: 'Patient_Info', component: PatientInfoComponent},
    { path: 'Addtional_Patient_Info', component: AdditionalPatientInfoComponent},
    {path:'Patient_Initial_Vitals',component:PatientInitialVitalsComponent},
    {path:'Patient_Vitals',component:PatientVitalsComponent},
    {path:'Choose_Symptoms',component:ChooseSymptomsComponent},
    {path:'Pain_Scale',component:RatePainComponent},
    {path:'Choose_Pained_Body_Part',component:PainedBodyPartComponent},
    {path:'Permanent Diseases',component:PermanentDiseasesComponent},
    {path:'Patient_History',component:PatientComplainDetailsComponent},
    {path:'Assesment',component:AssesmentComponent},
    // {path:'Report',component:FinalReportComponent},
    {path:'Report',component:ReportComponent},



     

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
