import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { UserInfo } from "../../../core/interfaces/user-info.interface";

const MAYORITY_AGE = 18;

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './template-forms-page.component.html',
  styleUrls: [
    './template-forms-page.component.scss',
    '../../common-page.scss',
    '../../common-form.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateFormsPageComponent implements AfterViewInit {

  /**
   * Datos del usuario para el formulario
   */
  userInfo: UserInfo = {
    firstName: 'Jose Alejandro',
    lastName: 'Sablon Cuesta',
    nickname: 'Josh',
    email: 'prueba@gmail.com',
    yearOfBirth: 1945,
    passport: 'AB123456',
    fullAdress: 'Fake Address from Mars',
    city: 'The Moon',
    postCode: 123456,
    password: '',
    confirmPassword: ''
  };

  /**
   * Formulario que esta en el template que tiene la directiva de ngForm
   */
  @ViewChild(NgForm) formDir!: NgForm;

  /**
   * Valor inicial del formulario para cuando se haga un reset
   */
  private initialFormValues: unknown;

  /**
   * Un getter que devuelve si los datos del formulario corresponden a una persona
   * mayor de edad
   */
  get isAdult(): boolean {
    const currentYear = (new Date()).getFullYear();
    return currentYear - this.userInfo.yearOfBirth >= MAYORITY_AGE;
  }

  /**
   * Devuelve los ultimos 100 años
   */
  get years(): number[] {
    const now = (new Date()).getFullYear();
    return Array(now - (now - 100)).fill('').map((_, idx) => now - idx);
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.initialFormValues = this.formDir?.value;
    })
  }

  /**
   * Cuando se hace submit en el formulario
   */
  onSubmitForm(e: SubmitEvent) {
    if (this.formDir.invalid) return;
    // Strategy 1 - Reset form values, validation statuses, making controls untouched, pristine, etc
    // form.resetForm();
    // Strategy 2 - Reset only control statuses but not values.
    this.formDir.resetForm(this.formDir.value);
    this.initialFormValues = this.formDir.value;
    // console.log('The native submit event', e);
  }

  /**
   * Resetea el formulario
   */
  onReset(e: Event) {
    e.preventDefault();
    this.formDir.resetForm(this.initialFormValues);
  }
}
