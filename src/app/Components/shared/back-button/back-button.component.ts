import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-back-button',
  standalone: false,
  
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css'
})
export class BackButtonComponent {
@Input() disabled:boolean=true;
@Input() message:string='Previous'
constructor(){}
}
