import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

export type RatingOptions = 'great' | 'good' | 'neutral' | 'bad' | null;

@Component({
  selector: 'mw-rating-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-picker.component.html',
  styleUrls: ['./rating-picker.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingPickerComponent { }
