import { LanguageService } from '../../../Services/language.service';
import { Language } from '../../../Interfaces/language';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 languages:Language[]=[]
 disabled:boolean=true;
 constructor(private __LanguageService:LanguageService){}
 ngOnInit(): void {
  this.__LanguageService.getLanguages().subscribe({
    next:(data)=> {this.languages=data;} })
 }
}
