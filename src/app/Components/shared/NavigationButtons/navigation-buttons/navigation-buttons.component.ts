import { Component, Input } from '@angular/core';
import { SharedService } from '../../../../Services/Shared/shared.service';

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
constructor(private __SharedService:SharedService){}
BackToPreviousPage(){
 this.__SharedService.navigateToPage(this.PreviousPageUrl);
}
navigateNextPage()
{ if(this.Key)
    this.__SharedService.saveItemInLocalStorage(this.Key,JSON.stringify(this.value));
 this.__SharedService.navigateToPage(this.NextPageUrl);
}
}
