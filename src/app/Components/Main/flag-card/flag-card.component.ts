import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flag-card',
  standalone: false,
  
  templateUrl: './flag-card.component.html',
  styleUrl: './flag-card.component.css'
})
export class FlagCardComponent {
@Input() Flag:any;
@Input() selected:boolean=false;
constructor(){}
}
