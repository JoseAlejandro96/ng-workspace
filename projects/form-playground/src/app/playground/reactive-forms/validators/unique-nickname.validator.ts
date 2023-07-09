import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UniqueNicknameValidator implements AsyncValidator {

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
