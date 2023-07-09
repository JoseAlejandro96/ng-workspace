import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function banWords(bannedWords: string[] = []): ValidatorFn {

  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    const fundBannedWord = bannedWords.find(
      word => word.toLowerCase() === control.value?.toLowerCase()
    );
    return !fundBannedWord ? null : { banWords: { bannedWord: fundBannedWord } }
  }
}
