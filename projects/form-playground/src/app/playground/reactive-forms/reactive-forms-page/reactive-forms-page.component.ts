import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormRecord, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { Observable, Subscription, bufferCount, filter, startWith, tap } from "rxjs";
import { DynamicValidatorMessage } from "../../../core/dynamic-validator-message.directive";
import { OnTouchedErrorStateMatcher } from "../../../core/input-error/error-state-matcher.service";
import { ValidatorMessageContainer } from "../../../core/input-error/validator-message-container.directive";
import { UserSkillsService } from "../../../core/services/user-skills.service";
import { banWords } from "../validators/ban-words.validator";
import { passwordShouldMatch } from "../validators/password-should-match.validator";
import { UniqueNicknameValidator } from "../validators/unique-nickname.validator";

interface FormPerson {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  nickname: FormControl<string>;
  email: FormControl<string>;
  yearOfBirth: FormControl<number>;
  passport: FormControl<string>;
  address: FormGroup<{
    fullAddress: FormControl<string>;
    city: FormControl<string>;
    postCode: FormControl<number>;
  }>;
  phones: FormArray<
    FormGroup<{
      label: FormControl<string>;
      phone: FormControl<string | null>;
    }>
  >;
  skills: FormRecord<FormControl<boolean | null>>;
  password: FormGroup<{
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
  }>;
}

@Component({
  selector: 'app-reactive-forms-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicValidatorMessage, ValidatorMessageContainer],
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
  showErrorStrategy = new OnTouchedErrorStateMatcher();

  form: FormGroup = this.fb.group<FormPerson>({
    /********/
    firstName: this.fb.control(
      'Jose Alejandro',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(4),
          banWords(['test', 'dummy'])
        ]
      }),
    /********/
    lastName: this.fb.control(
      'Sablon',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(2)
        ]
      }
    ),
    /********/
    nickname: this.fb.control(
      '',
      {
        nonNullable: true,
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
      }
    ),
    /********/
    email: this.fb.control(
      'josealejasdas@asdas.com',
      {
        nonNullable: true,
        updateOn: 'change',
        validators: [
          Validators.email,
          Validators.required
        ]
      }
    ),
    /********/
    yearOfBirth: this.fb.nonNullable.control(
      this.years[this.years.length - 1],
      Validators.required
    ),
    /********/
    passport: this.fb.control(
      '',
      {
        nonNullable: true,
        updateOn: 'change',
        validators: [
          Validators.pattern(/^[A-Z]{2}[0-9]{6}$/)
        ]
      }
    ),
    /********/
    address: this.fb.nonNullable.group({
      fullAddress: ['', Validators.required],
      city: ['', Validators.required],
      postCode: [0, Validators.required]
    }),
    /********/
    phones: this.fb.array([
      this.fb.group({
        label: this.fb.nonNullable.control(this.phoneLabels[0]),
        phone: ['', { updateOn: 'change' }]
      })
    ]),
    /********/
    skills: this.fb.record<boolean>({}),
    /********/
    password: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ''
    }, {
      validators: passwordShouldMatch
    })
  });

  private ageValidators!: Subscription;
  private formPendingState!: Subscription;

  private initialFormValues: any;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  constructor(
    private readonly userSkills: UserSkillsService,
    private readonly fb: FormBuilder,
    private readonly uniqueNickname: UniqueNicknameValidator,
    private readonly cd: ChangeDetectorRef
  ) {
  }


  ngOnInit(): void {
    this.skills$ = this.userSkills.getSkills().pipe(
      tap(skills => this.buildSkillControls(skills)),
      tap(() => this.initialFormValues = this.form.value)
    );

    this.ageValidators = (this.form.get('yearOfBirth') as FormControl).valueChanges.pipe(
      tap(() => (this.form.get('passport') as FormControl).markAsDirty()),
      startWith((this.form.get('yearOfBirth') as FormControl).value)
    ).subscribe(
      yearOfBirth => {
        this.isAdult(yearOfBirth)
          ? (this.form.get('passport') as FormControl).addValidators(Validators.required)
          : (this.form.get('passport') as FormControl).removeValidators(Validators.required);
        (this.form.get('passport') as FormControl).updateValueAndValidity();
      }
    );

    this.formPendingState = this.form.statusChanges.pipe(
      bufferCount(2, 1),
      filter(([prevState]) => prevState === 'PENDING')
    ).subscribe(() => this.cd.markForCheck());
  }

  ngOnDestroy(): void {
    this.ageValidators.unsubscribe();
    this.formPendingState.unsubscribe();
  }

  get phones() {
    return this.form.get('phones') as FormArray;
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

  addPhone() {
    (this.form.get('phones') as FormArray)?.insert(0,
      new FormGroup({
        label: new FormControl(this.phoneLabels[0], { nonNullable: true }),
        phone: new FormControl('')
      })
    )
  }

  removePhone(index: number) {
    (this.form.get('phones') as FormArray)?.removeAt(index);
  }

  private getYears() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 100)).fill('').map((_, idx) => now - idx);
  }

  private buildSkillControls(skills: string[]) {
    skills.forEach(skill =>
      (this.form.get('skills') as FormRecord).addControl(
        skill,
        new FormControl(false, { nonNullable: true })
      )
    );
  }

  private isAdult(yearOfBirth: number): boolean {
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth >= 18;
  }
}
