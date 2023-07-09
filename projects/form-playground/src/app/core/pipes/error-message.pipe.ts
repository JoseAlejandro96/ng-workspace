import { Pipe, PipeTransform } from "@angular/core";
import { VALIDATION_ERROR_MESSAGES } from "../input-error/validation-error-message.token";
import { inject } from "@angular/core";


@Pipe({
  name: 'errorMessage',
  standalone: true
})
export class ErrorMessagePipe implements PipeTransform {

  private errorMessages = inject(VALIDATION_ERROR_MESSAGES);

  transform(key: string, errorValue: any) {
    if (!this.errorMessages[key]) {
      console.warn(`Missing message for ${key} validator...`);
      return '';
    }
    return this.errorMessages[key](errorValue);
  }
}
