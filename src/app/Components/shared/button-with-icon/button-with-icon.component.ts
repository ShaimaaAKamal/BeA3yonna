import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-with-icon',
  standalone: false,
  
  templateUrl: './button-with-icon.component.html',
  styleUrl: './button-with-icon.component.css'
})
export class ButtonWithIconComponent {
@Input() btnAction:string='';
@Input() disabled:boolean=true;

}
