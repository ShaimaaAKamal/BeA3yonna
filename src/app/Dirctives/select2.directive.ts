import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

declare var window: any; // Declare window as a global object

@Directive({
  selector: '[appSelect2]',
  standalone: true
})
export class Select2Directive implements AfterViewInit, OnDestroy {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    window.$(this.el.nativeElement).select2(); 
  }

  ngOnDestroy(): void {
    window.$(this.el.nativeElement).select2('destroy');
  }
}