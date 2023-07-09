import { Injectable } from "@angular/core";
import { AbstractControl, FormGroupDirective, NgForm } from "@angular/forms";


export interface ErrorStateMatcherInterface {
  isErrorVisible(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean
}

@Injectable({
  providedIn: 'root'
})
export class ErrorStateMatcher implements ErrorStateMatcherInterface {

  isErrorVisible(control: AbstractControl<any, any> | null, form: FormGroupDirective | NgForm | null): boolean {
    return Boolean(control && control.invalid && (control.touched || (form && form.submitted)));
  }

}
