import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { PatientReportInfoService } from '../../../../Services/Shared/PatientReportInfo/patient-report-info.service';
import { SharedService } from '../../../../Services/Shared/shared.service';

@Component({
  selector: 'app-display-symptoms',
  standalone: false,

  templateUrl: './display-symptoms.component.html',
  styleUrl: './display-symptoms.component.css'
})
export class DisplaySymptomsComponent {
@Input() heading:string='';
@Input() pageSize:number=12;
@Input() currentPage:number=1;
storedSymptoms:string[]=[];
@Input() PreviousPageUrl:string='';
@Input() NextPageUrl:string='';
@Input() MoreCLasses:string='';
@Input() NextButtonDisabled:boolean=true;
@Input() Key:string='';
@Input() value:any;
@Input() symptoms:string[]=[];
@Input() selectedSymptoms:string[]=[];
@Output() NextButtonDisabledChange = new EventEmitter<boolean>();
searchKey:string='';
AllSymptoms:string[]=[];

@HostListener('window:resize', ['$event'])
@HostListener('window:load', ['$event'])
 onWindowEvent() {
    this.performAction();
  }

constructor(private __PatientReportInfoService:PatientReportInfoService,
  private __SharedService:SharedService){}

ngOnInit(): void {

  this.AllSymptoms=this.symptoms.sort();
  this.storedSymptoms=this.__PatientReportInfoService.getPatientFieldValueByKey(this.Key);
  this.NextButtonDisabled=( this.storedSymptoms.length !=0)?false:true;
  this.selectedSymptoms=this.storedSymptoms.sort();
  this.performAction();
}
chooseSymptom(symptom: string) {
  const index = this.selectedSymptoms.indexOf(symptom);
  if (index === -1)
    this.selectedSymptoms.push(symptom);
  else
    this.selectedSymptoms.splice(index, 1);
  this.selectedSymptoms.sort();
  this.NextButtonDisabled=(this.selectedSymptoms.length !=0 ) ?false:true;
  this.NextButtonDisabledChange.emit(this.NextButtonDisabled);
}

isSelected(symptom: string): boolean {
  return this.selectedSymptoms.includes(symptom);
}

search(){
if(!this.searchKey) this.symptoms=this.AllSymptoms
else this.symptoms=this.filterSymptoms();
}

filterSymptoms() {
  const filteredSymptoms = this.AllSymptoms.filter((symptom:string) =>
    symptom.toLowerCase().includes(this.searchKey.toLowerCase())
  );
  return filteredSymptoms;
}
handlePageChange(page: number) {
    this.currentPage = page;
  }
performAction(){
  const index=this.AllSymptoms.indexOf(this.selectedSymptoms[0]);
  this.pageSize=this.__SharedService.getPageSize(this.pageSize);
  this.currentPage=this.__SharedService.getCurrentPage(index,this.pageSize);
}
}
