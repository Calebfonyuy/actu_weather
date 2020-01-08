import { Directive, Renderer2, ElementRef , Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appPasswordCheck]'
})
export class PasswordCheckDirective {
	private source_element_id:string;

  constructor(private renderer: Renderer2, private element: ElementRef) { }

  @HostListener('change')
  private onchange(){
	  this.renderer.setStyle(this.element.nativeElement,'color','red');
  }

}
