// import { Component } from '@angular/core';
// import { map, Observable } from 'rxjs';
// import { FlagService } from '../../../Services/Flag/flag.service';
// import { Country } from '../../../Interfaces/country';
import { SharedService } from '../../../Services/Shared/shared.service';
import { Router } from '@angular/router';

// @Component({
//   selector: 'app-choose-flag',
//   standalone: false,
//   templateUrl: './choose-flag.component.html',
//   styleUrl: './choose-flag.component.css'
// })
// export class ChooseFlagComponent {
//   Flags$!:Observable<Country[]>;
//   constructor(private __FlagService:FlagService){}
//   ngOnInit(): void {
//     this.Flags$ = this.__FlagService.getCountries().pipe(
//       map((countries:any) => 
//         countries.map((country: any) => ({
//           name: country.name.common,
//           flags: country.flags, 
//           languages: country.languages 
//         }))
//       )
//     );
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlagService } from '../../../Services/Flag/flag.service';
import { Country } from '../../../Interfaces/country';



@Component({
  selector: 'app-choose-flag',
  standalone:false,
  templateUrl: './choose-flag.component.html',
  styleUrls: ['./choose-flag.component.css']
})
export class ChooseFlagComponent implements OnInit {
  Flags$!: Observable<Country[]>; 
  NextButtondisabled:boolean=true;
  currentPage:number = 1;
  pageSize:number = 24;
  searchKey:string='';
  selectedFlag:Country={name:'',flags:{},languages:{}};
  storedCountry:Country|null=null;
  constructor(private __FlagService: FlagService,private __SharedService:SharedService) {}

  ngOnInit(): void {
      this.Flags$ =this.mapApiFlagsData(this.__FlagService.getCountries());
      this.storedCountry=this.__SharedService.getItemFromLocalStorage('Country')?JSON.parse(this.__SharedService.getItemFromLocalStorage('Country')):null;
      this.NextButtondisabled=!this.storedCountry ? true : false;
      this.currentPage=this.__SharedService.getItemFromLocalStorage('CountrycurrentPage')?JSON.parse(this.__SharedService.getItemFromLocalStorage('CountrycurrentPage')):1;
  }

  searchForCountry(){
      this.Flags$ =this.mapApiFlagsData(this.__FlagService.searchByCountryName(this.searchKey));
  }

 
  chooseFlag(Flag:Country){
    this.selectedFlag=Flag;
    this.NextButtondisabled=false;
    this.__SharedService.saveItemInLocalStorage('Country',JSON.stringify(Flag));
    this.__SharedService.saveItemInLocalStorage('CountrycurrentPage',JSON.stringify(this.currentPage));
  }

  mapApiFlagsData(flagData:Observable<any>){
    return flagData.pipe(
          map(countries => (countries ? countries.map((country:any) => ({
            name: country.name.common,
            flags: country.flags,
            languages:country.languages,
          })) : []))
        );
  }

}