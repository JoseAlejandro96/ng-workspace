import { ComponentRef, Directive, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef, inject } from "@angular/core";
import { ControlContainer, FormGroupDirective, NgControl, NgForm, NgModel } from "@angular/forms";
import { InputErrorComponent } from "./input-error/input-error.component";
import { EMPTY, Subscription, fromEvent, iif, merge, skip, startWith } from "rxjs";
import { ErrorStateMatcher } from "./input-error/error-state-matcher.service";


@Directive({
  selector: `
    [ngModel]:not([withoutValidationErrors]),
    [formControl]:not([withoutValidationErrors]),
    [formControlName]:not([withoutValidationErrors]),
    [formGroupName]:not([withoutValidationErrors]),
    [ngModelGroup]:not([withoutValidationErrors])
    `,
  standalone: true
})
export class DynamicValidatorMessage implements OnInit, OnDestroy {

  ngControl = inject(NgControl, { self: true, optional: true }) || inject(ControlContainer, { self: true });

  elementRef = inject(ElementRef);

  get form() {
    return this.parentContainer?.formDirective as NgForm | FormGroupDirective | null;
  }

  @Input()
  errorStateMatcher = inject(ErrorStateMatcher);

  @Input()
  container = inject(ViewContainerRef);


  private componentRef: ComponentRef<InputErrorComponent> | null = null;

  private errorMessageTrigger!: Subscription;

  private parentContainer = inject(ControlContainer, { optional: true });

  ngOnInit(): void {
    queueMicrotask(() => {
      if (!this.ngControl.control) throw (`No control model for ${this.ngControl.name} control...`)

      this.errorMessageTrigger = merge(
        this.ngControl.control.statusChanges,
        fromEvent(this.elementRef.nativeElement, 'blur'),
        iif(() => !!this.form, this.form!.ngSubmit, EMPTY)
      ).pipe(
        startWith(this.ngControl.control.status),
        skip(this.ngControl instanceof NgModel ? 1 : 0),
      ).subscribe(() => {
        if (this.errorStateMatcher.isErrorVisible(this.ngControl.control, this.form)) {
          if (!this.componentRef) {
            this.componentRef = this.container.createComponent(InputErrorComponent);
            this.componentRef.changeDetectorRef.markForCheck();
          }
          this.componentRef.setInput('errors', this.ngControl.errors);
        } else {
          this.componentRef?.destroy();
          this.componentRef = null;
        }
      })
    });

    fromEvent(this.elementRef.nativeElement, 'blur').subscribe((value) => {
      console.log('blur', value);
    })
  }

  ngOnDestroy(): void {
    this.errorMessageTrigger?.unsubscribe();
  }
}
