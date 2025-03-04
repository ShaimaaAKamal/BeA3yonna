import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientVitals } from '../../../../Interfaces/patient-vitals';
import { PatientReportInfoService } from '../../../../Services/Shared/PatientReportInfo/patient-report-info.service';

@Component({
  selector: 'app-patient-vitals',
  standalone: false,
  
  templateUrl: './patient-vitals.component.html',
  styleUrl: './patient-vitals.component.css'
})
export class PatientVitalsComponent implements OnInit {
  patientVitals!:FormGroup;
  vitals:string[]=['Weight','Height','Blood Pressure','Blood Sugar','Temperature','Heart Rate','Breathe Rate','Oxygen Rate'];
  storedPatientVitals!:PatientVitals;
  constructor(private __PatientReportInfoService:PatientReportInfoService){}

  ngOnInit(): void {
    this.storedPatientVitals=this.__PatientReportInfoService.getPatientFieldValueByKey('patientVitals');
    this.patientVitals = new FormGroup({
        Weight: new FormControl(this.storedPatientVitals?.Weight ?? '',[Validators.required,Validators.pattern('^[0-9٠-٩]+$')]),
        Height: new FormControl(this.storedPatientVitals?.Height ?? '', [Validators.required,Validators.pattern('^[0-9٠-٩]+$')]),
        Temperature: new FormControl(this.storedPatientVitals?.Temperature ?? '', [Validators.required,Validators.pattern('^[0-9٠-٩]+$')]),
       'Blood Pressure': new FormControl(this.storedPatientVitals?.['Blood Pressure'] ?? '', [Validators.required,Validators.pattern('^[0-9٠-٩]+$')]),
       'Oxygen Rate': new FormControl(this.storedPatientVitals?.['Oxygen Rate']?? '', [Validators.required,Validators.pattern('^[0-9٠-٩]+$')]),
        'Blood Sugar': new FormControl(this.storedPatientVitals?.['Blood Sugar'] ?? '', [Validators.required,Validators.pattern('^[0-9٠-٩]+$')]),
        'Heart Rate': new FormControl(this.storedPatientVitals?.['Heart Rate']?? '', [Validators.required,Validators.pattern('^[0-9٠-٩]+$')]),
        'Breathe Rate': new FormControl(this.storedPatientVitals?.['Breathe Rate'] ?? '', [Validators.required,Validators.pattern('^[0-9٠-٩]+$')]),
      });
  }
}
