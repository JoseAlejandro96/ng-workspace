import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { UserSkillsService } from "../../../core/services/user-skills.service";
import { UniqueNicknameValidator } from "../validators/unique-nickname.validator";

@Component({
  selector: 'app-reactive-forms-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-forms-page.component.html',
  styleUrls: [
    './reactive-forms-page.component.scss',
    '../../common-page.scss',
    '../../common-form.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormsPageComponent {


  constructor(
    private readonly userSkills: UserSkillsService,
    private readonly fb: FormBuilder,
    private readonly uniqueNickname: UniqueNicknameValidator,
    private readonly cd: ChangeDetectorRef
  ) { }

}
