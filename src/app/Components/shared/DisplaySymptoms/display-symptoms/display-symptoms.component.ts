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
storedSymptoms:string[]=[];
FilteredSymptoms: string[] = []; // Stores search results

@HostListener('window:resize', ['$event'])
@HostListener('window:load', ['$event'])
 onWindowEvent() {
    this.updatePagination();
  }

constructor(private __PatientReportInfoService:PatientReportInfoService,private __SharedService:SharedService){}

ngOnInit(): void {
  this.symptoms.sort();
  this.AllSymptoms=[...this.symptoms];
  this.FilteredSymptoms = this.AllSymptoms;
  this.storedSymptoms=this.__PatientReportInfoService.getPatientFieldValueByKey(this.Key).sort();
  this.selectedSymptoms=this.storedSymptoms;
  this.updateNextButtonDisabled(this.storedSymptoms);
  this.updatePagination();
}
chooseSymptom(symptom: string) {
  const index = this.selectedSymptoms.indexOf(symptom);
  (index === -1)?this.selectedSymptoms.push(symptom):this.selectedSymptoms.splice(index, 1);
  this.selectedSymptoms.sort();
  this.updateNextButtonDisabled(this.selectedSymptoms);
  this.NextButtonDisabledChange.emit(this.NextButtonDisabled);
}

private updateNextButtonDisabled(symptoms:string[]){
  this.NextButtonDisabled=( symptoms.length !=0)?false:true;
}

 isSelected(symptom: string): boolean {
  return this.selectedSymptoms.includes(symptom);
}


search() {
    this.currentPage = 1;
    this.symptoms = this.searchKey ? this.filterSymptoms() : this.AllSymptoms;
    this.FilteredSymptoms=this.symptoms;
    this.updatePagination();
  }
private filterSymptoms(): string[] {
    return this.AllSymptoms.filter(symptom =>
      symptom.toLowerCase().includes(this.searchKey.toLowerCase())
    );
  }
handlePageChange(page: number) {
    this.currentPage = page;
  }


updatePagination() {
    const index = this.FilteredSymptoms.indexOf(this.selectedSymptoms[0]);
    console.log(index);
    this.pageSize = this.__SharedService.getPageSize(this.pageSize);
    console.log('pageSize',this.pageSize);
    this.currentPage = this.__SharedService.getCurrentPage(index, this.pageSize);
    console.log(  this.currentPage )
  }
}
