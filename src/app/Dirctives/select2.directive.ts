import { Directive, ElementRef, AfterViewInit, OnDestroy , Output,EventEmitter} from '@angular/core';

declare var window: any; // Declare window as a global object

@Directive({
  selector: '[appSelect2]',
  standalone: true
})
export class Select2Directive implements AfterViewInit, OnDestroy {
  @Output() valueChange = new EventEmitter<string>(); // Emits when value changes
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    window.$(this.el.nativeElement).select2(); 
     // Handle change event
     window.$(this.el.nativeElement).on('change', (event:any) => {
      this.valueChange.emit(event.target.value);
    });
  }

  ngOnDestroy(): void {
    window.$(this.el.nativeElement).select2('destroy');
  }
}