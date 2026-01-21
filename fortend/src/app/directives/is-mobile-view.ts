import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIsMobileView]',
})
export class IsMobileView implements OnChanges {

  @Input('appIsMobileView') condition!: boolean;

  constructor(
    private el : ElementRef, 
    private renderer : Renderer2
  ) {}


  ngOnChanges(): void {
    if(this.condition){
      this.renderer.removeClass(this.el.nativeElement, 'hidden')
      this.renderer.addClass(this.el.nativeElement, 'block')
    }else{
      this.renderer.removeClass(this.el.nativeElement, 'block')
      this.renderer.addClass(this.el.nativeElement, 'hidden')
    }

  }

}
