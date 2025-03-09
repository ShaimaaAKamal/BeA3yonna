import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LiveTranslationsService } from '../../../../Services/LiveTranslationService/live-translations.service';
import { PatientReportInfoService } from '../../../../Services/Shared/PatientReportInfo/patient-report-info.service';

@Component({
  selector: 'app-pagination',
  standalone: false,
  
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit{
 @Input() currentPage: number = 1; 
 @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
 Next:string='Next';
 Previous:string='Previous';

 constructor(private __LiveTranslationsService:LiveTranslationsService,private __PatientReportInfoService:PatientReportInfoService){}

 ngOnInit(): void {
  const lang:string=this.__PatientReportInfoService.getPatientLanguage().lang;
 this.__LiveTranslationsService.translateText(this.Next,lang).subscribe({
  next:(data)=>this.Next=data
 })
   this.__LiveTranslationsService.translateText(this.Previous,lang).subscribe({
  next:(data)=>this.Previous=data
 })
 }
  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
