import { Component, Input } from '@angular/core';
import { SharedService } from '../../../../Services/Shared/shared.service';
import { PatientReportInfoService } from '../../../../Services/Shared/PatientReportInfo/patient-report-info.service';
import { PatientReportData } from '../../../../Interfaces/patient-report-data';

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
constructor(private __SharedService:SharedService,private __PatientReportInfoService:PatientReportInfoService){}
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
}    
 this.__SharedService.navigateToPage(this.NextPageUrl);
}
}
