
import { Directive, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter, NgZone } from '@angular/core';
import { Selec2 } from '../Interfaces/selec2';

declare var window: any; // Global jQuery

@Directive({
  selector: '[appSelect2]',
  standalone: true
})
export class Select2Directive implements AfterViewInit, OnDestroy {
  @Output() valueChange = new EventEmitter<Selec2>(); 
  private isSelect2Active = false; // Track if Select2 is initialized

  constructor(private el: ElementRef, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initializeSelect2();

      setTimeout(() => {
        const savedValue = localStorage.getItem('lang');
        if (savedValue) {
          this.applyValue(savedValue);
        }
      }, 200);
    });
  }

  initializeSelect2(): void {
    if (this.isSelect2Active) return; // Prevent duplicate initialization

    setTimeout(() => {
      const currentLang = localStorage.getItem('lang') || 'en';
      const isRtl = this.isRtlLanguage(currentLang);

      this.isSelect2Active = true;
      window.$(this.el.nativeElement).select2({ dir: isRtl ? 'rtl' : 'ltr' });

      // Attach change event only if not already attached
      window.$(this.el.nativeElement).off('change').on('change', (event: any) => {
        if (this.isSelect2Active) {
        const selectedOption = event.target.selectedOptions[0]; 
        const optionInnerHTML = selectedOption ? selectedOption.innerHTML : '';
          this.ngZone.run(() => {
            this.valueChange.emit({
                value: event.target.value, 
                text: optionInnerHTML 
            });
            this.updateDirection(event.target.value);
          });
        }
      });
    }, 100);
  }

  applyValue(value: string): void {
    setTimeout(() => {
      if (this.isSelect2Active && window.$(this.el.nativeElement).data('select2')) {
        window.$(this.el.nativeElement).val(value).trigger('change');
      }
    }, 200);
  }

  updateDirection(lang: string): void {
    const isRtl = this.isRtlLanguage(lang);

    if (this.isSelect2Active && window.$(this.el.nativeElement).data('select2')) {
      this.isSelect2Active = false;
      window.$(this.el.nativeElement).select2('destroy');
    }

    setTimeout(() => {
      if (window.$(this.el.nativeElement).length) {
        this.isSelect2Active = true;
        window.$(this.el.nativeElement).select2({ dir: isRtl ? 'rtl' : 'ltr' });
      }
    }, 200);
  }

  isRtlLanguage(lang: string): boolean {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    return rtlLanguages.includes(lang);
  }

  ngOnDestroy(): void {
    if (this.isSelect2Active && window.$(this.el.nativeElement).data('select2')) {
      this.isSelect2Active = false;
      window.$(this.el.nativeElement).select2('destroy');
    }
  }
}