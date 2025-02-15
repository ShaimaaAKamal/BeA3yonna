import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Main/home/home.component';
import { ChooseFlagComponent } from './Components/Main/flag-card/choose-flag/choose-flag.component';

const routes: Routes = [
    { path: '', component: HomeComponent ,pathMatch:'full'},
    { path: 'Choose_Flag', component: ChooseFlagComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
