import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RotateAnimationDirective } from "./rotate-animation.directive";


@NgModule({
  declarations: [RotateAnimationDirective],
  exports: [RotateAnimationDirective],
  imports: [CommonModule]
})
export class DirectivesModule { }
