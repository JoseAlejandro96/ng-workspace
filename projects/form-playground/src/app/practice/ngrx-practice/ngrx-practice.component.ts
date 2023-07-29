import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ngrx-practice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngrx-practice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgRxPracticeComponent {}
