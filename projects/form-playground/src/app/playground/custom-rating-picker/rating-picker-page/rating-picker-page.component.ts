import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RatingOptions, RatingPickerComponent } from "custom-form-controls";
import { EditableContentValueAccessor } from "../value-accessor/editable-content.directive";

interface Rating {
  reviewText: string,
  reviewRating: RatingOptions
}

@Component({
  selector: 'app-rating-picker-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditableContentValueAccessor, RatingPickerComponent],
  templateUrl: './rating-picker-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    './rating-picker-page.component.scss'
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingPickerPageComponent {

  form = this.fb.group<Rating>({
    reviewText: '',
    reviewRating: 'great'
  });

  constructor(private readonly fb: FormBuilder) { }

  onSubmit() {
    console.log(this.form.value);
    this.form.reset();
  }
}
