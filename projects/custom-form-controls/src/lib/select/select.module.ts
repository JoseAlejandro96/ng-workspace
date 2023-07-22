import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RotateAnimationDirective } from '../directives/rotate-animation.directive';
import { OptionComponent } from './option/option.component';
import { SelectComponent } from './select.component';
import { DirectivesModule } from '../directives/directives.module';


@NgModule({
  declarations: [OptionComponent, SelectComponent],
  exports: [OptionComponent, SelectComponent],
  imports: [CommonModule, OverlayModule, DirectivesModule],
  providers: []
})
export class SelectModule { }
