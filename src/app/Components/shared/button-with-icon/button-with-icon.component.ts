import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../Services/Shared/shared.service';
import { LiveTranslationsService } from '../../../Services/LiveTranslationService/live-translations.service';

@Component({
  selector: 'app-button-with-icon',
  standalone: false,
  
  templateUrl: './button-with-icon.component.html',
  styleUrl: './button-with-icon.component.css'
})
export class ButtonWithIconComponent implements OnInit {
@Input() btnAction:string='';
@Input() disabled:boolean=true;
textsToTranslate!:string[];
constructor(private __SharedService:SharedService,private __LiveTranslationsService:LiveTranslationsService){}
 
ngOnInit(): void {
this.textsToTranslate=[this.btnAction]
       this.__LiveTranslationsService.loadTranslations(this.__SharedService.getSiteLanguage(),this.textsToTranslate);
      }
}
