import { Directive, OnInit, Renderer2, ElementRef , Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appPasswordCheck]'
})
export class PasswordCheckDirective {
	@Input()
	private source_element_id:string;
	private source_element:HTMLInputElement;

  constructor(private renderer: Renderer2, private element: ElementRef) { }

	ngOnInit(){
		this.source_element = <HTMLInputElement>document.getElementById(this.source_element_id);
		this.renderer.setStyle(this.element.nativeElement,'border-width', '2px');
	}

  @HostListener('input')
  private onchange(){
	  let value = this.element.nativeElement.value;
	  let expected = this.source_element.value;
	  if(value!=expected){
		  this.renderer.setStyle(this.element.nativeElement,'border-color', 'red');
	  }else{
		  this.renderer.setStyle(this.element.nativeElement,'border-color', '');
	  }
  }

}
