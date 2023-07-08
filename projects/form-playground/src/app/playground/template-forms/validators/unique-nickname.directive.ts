import { ChangeDetectorRef, Directive } from "@angular/core";
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from "@angular/forms";
import { BehaviorSubject, Observable, catchError, delay, finalize, map, of } from "rxjs";



@Directive({
  selector: '[appUniqueNickname]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueNicknameDirective,
      multi: true,
    }
  ]
})
export class UniqueNicknameDirective implements AsyncValidator {

  private usedNicknames: BehaviorSubject<string[]> = new BehaviorSubject([
    'josh',
    'mike',
    'Laila',
    'mari',
  ]);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return new Observable<ValidationErrors | null>(observer => {
      const value = control.value?.toLowerCase();

      if (value && this.usedNicknames.getValue().includes(value)) {
        observer.next({ appUniqueNickname: { isTaken: true } });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  }

}
