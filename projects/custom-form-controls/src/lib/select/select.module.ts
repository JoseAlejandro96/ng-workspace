import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OptionComponent } from './option/option.component';
import { SelectComponent } from './select.component';


@NgModule({
  declarations: [OptionComponent, SelectComponent],
  exports: [OptionComponent, SelectComponent],
  imports: [CommonModule, OverlayModule]
})
export class SelectModule { }
