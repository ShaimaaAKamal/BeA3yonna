import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-symptom-card',
  standalone: false,
  
  templateUrl: './symptom-card.component.html',
  styleUrl: './symptom-card.component.css'
})
export class SymptomCardComponent {
@Input() Symptom:string='';
@Input() selected:boolean=false;
}
