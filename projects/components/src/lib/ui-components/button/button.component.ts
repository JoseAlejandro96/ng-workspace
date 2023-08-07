import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { CanAppearanceDirective } from '../../directives/can-appearance.directive';
import { CanColorDirective } from '../../directives/can-color.directive';
import { CanDisableDirective } from '../../directives/can-disable.directive';

@Component({
  selector: 'button[dfButton], a[dfButton]',
  standalone: true,
  template: `
    <span class="button-label">
      <ng-content></ng-content>
    </span>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: CanColorDirective,
      inputs: ['color']
    },
    {
      directive: CanDisableDirective,
      inputs: ['disabled']
    },
    {
      directive: CanAppearanceDirective,
      inputs: ['appearance: type']
    }
  ]
})
export class ButtonComponent { }
