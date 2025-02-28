import { Component } from '@angular/core';
import { SharedService } from '../../../../Services/Shared/shared.service';

@Component({
  selector: 'app-not-found',
  standalone: false,
  
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
constructor(private __SharedService:SharedService){}
navigateToHome(){
this.__SharedService.navigateToPage('/');
}
}
