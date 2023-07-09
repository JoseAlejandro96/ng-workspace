import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserSkillsService } from "../../../core/services/user-skills.service";
import { UniqueNicknameValidator } from "../validators/unique-nickname.validator";
import { banWords } from "../validators/ban-words.validator";
import { Observable } from "rxjs";
import { passwordShouldMatch } from "../validators/password-should-match.validator";

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
export class ReactiveFormsPageComponent implements OnInit, OnDestroy {

  phoneLabels = ['Main', 'Mobile', 'Work', 'Home'];
  years = this.getYears();
  skills$!: Observable<string[]>;
  // showErrorStrategy = new OnTouchedErrorStateMatcher();

  form: FormGroup = this.fb.group({
    firstName: ['Jose Alejandro', [Validators.required, Validators.minLength(4), banWords(['test', 'dummy'])]],
    lastName: ['Sablon', [Validators.required, Validators.minLength(2)]],
    nickname: ['',
      {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[\w.]+$/),
          banWords(['dummy', 'anonymous'])
        ],
        asyncValidators: [
          this.uniqueNickname.validate.bind(this.uniqueNickname)
        ],
        updateOn: 'change'
      },

    ],
    email: ['josealejasdas@asdas.com', [Validators.email, Validators.required]],
    yearOfBirth: this.fb.nonNullable.control(
      this.years[this.years.length - 1],
      Validators.required
    ),
    passport: ['', [Validators.pattern(/^[A-Z]{2}[0-9]{6}$/)]],
    address: this.fb.nonNullable.group({
      fullAddress: ['', Validators.required],
      city: ['', Validators.required],
      postCode: [0, Validators.required]
    }),
    phones: this.fb.array([
      this.fb.group({
        label: this.fb.nonNullable.control(this.phoneLabels[0]),
        phone: ''
      })
    ]),
    skills: this.fb.record<boolean>({}),
    password: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ''
    }, {
      validators: passwordShouldMatch
    })
  });;

  constructor(
    private readonly userSkills: UserSkillsService,
    private readonly fb: FormBuilder,
    private readonly uniqueNickname: UniqueNicknameValidator,
    private readonly cd: ChangeDetectorRef
  ) {
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }




  private getYears() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 100)).fill('').map((_, idx) => now - idx);
  }


  onSubmit(e: Event) {
    // console.log(this.form.value);
    // this.initialFormValues = this.form.value;
    // this.formDir.resetForm(this.form.value);
  }

  onReset(e: Event) {
    e.preventDefault();
    // this.formDir.resetForm(this.initialFormValues);
  }



}
