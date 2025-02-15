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
    this.initializeSelect2();

    setTimeout(() => {
      const savedValue = localStorage.getItem('lang');
      if (savedValue)
        window.$(this.el.nativeElement).val(savedValue).trigger('change');
    }, 130);
     window.$(this.el.nativeElement).on('change', (event:any) => {
      this.valueChange.emit(event.target.value);
    });
  }

   initializeSelect2(): void {
    setTimeout(() => {
      window.$(this.el.nativeElement).select2();
    }, 100); // Delay to ensure translation is applied
  }
  ngOnDestroy(): void {
    window.$(this.el.nativeElement).select2('destroy');
  }
}
