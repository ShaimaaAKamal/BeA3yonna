import { Component, Input } from '@angular/core';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { PatientReportInfoService } from '../../../../Services/Shared/PatientReportInfo/patient-report-info.service';
import { PatientReportData } from '../../../../Interfaces/patient-report-data';
import { TranslateService } from '@ngx-translate/core';
import { StyleService } from '../../../../Services/style/style.service';

@Component({
  selector: 'app-navigation-buttons',
  standalone: false,
  
  templateUrl: './navigation-buttons.component.html',
  styleUrl: './navigation-buttons.component.css'
})
export class NavigationButtonsComponent {
@Input() PreviousPageUrl:string='';
@Input() NextPageUrl:string='';
@Input() NextButtonDisabled:boolean=false;
@Input() MoreCLasses:string='';
@Input() Key:string='';
@Input() value:any;
@Input() actionName:string='Next';
constructor(private __SharedService:SharedService,
  private __PatientReportInfoService:PatientReportInfoService,
  private __TranslateService:TranslateService,
  private __StyleService:StyleService){}
BackToPreviousPage(){
 this.__SharedService.navigateToPage(this.PreviousPageUrl);
}
navigateNextPage()
{ if(this.Key)
    this.__PatientReportInfoService.updatePatientDataByKey([this.Key],[JSON.stringify(this.value)]);
if(this.actionName == 'Done'){
 this.__PatientReportInfoService.addNewPatientReport(this.value);
 this.__SharedService.removeItemFromLocalStorage('patientReport');
 const emptyReport:PatientReportData=this.__SharedService.getDefaultValue('patientReport');
 this.__PatientReportInfoService.patientReport.next(emptyReport);
 this.__TranslateService.use('en');
 this.__StyleService.switchStyleToRTL(false,'en');
}    
 this.__SharedService.navigateToPage(this.NextPageUrl);
}
}
