import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';


@Directive({
  selector: '[appRotateAnimation]'
})
export class RotateAnimationDirective implements OnChanges {

  @Input() appRotateAnimation: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appRotateAnimation']) {
      this.animateRotation();
    }
  }

  onClick() {
    this.appRotateAnimation = !this.appRotateAnimation;
  }

  private animateRotation() {
    const rotationValue = this.appRotateAnimation ? '180deg' : '0';
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.2s ease-in-out');
    this.renderer.setStyle(this.el.nativeElement, 'transform', `rotate(${rotationValue})`);
  }
}
