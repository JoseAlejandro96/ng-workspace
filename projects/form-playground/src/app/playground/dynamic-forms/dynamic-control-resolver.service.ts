import { Injectable, Type } from '@angular/core';
import { from, of, tap } from 'rxjs';
import { DynamicControl } from './dynamic-forms.model';

type DynamicControlsMap = {
  [T in DynamicControl['controlType']]: () => Promise<Type<any>>;
};

@Injectable({
  providedIn: 'root'
})
export class DynamicControlResolver {

  private lazyControlComponents: DynamicControlsMap =
    {
      input: () => import('./dynamic-control/dynamic-input.component').then(c => c.DynamicInputComponent),
      select: () => import('./dynamic-control/dynamic-select.component').then(c => c.DynamicSelectComponent),
      checkbox: () => import('./dynamic-control/dynamic-checkbox.component').then(c => c.DynamicCheckboxComponent),
      group: () => import('./dynamic-control/dynamic-group.component').then(c => c.DynamicGroupComponent)
    }

  private loadedControlComponents = new Map<string, Type<any>>();

  resolve(controlType: keyof DynamicControlsMap) {
    const loadedComponent = this.loadedControlComponents.get(controlType);
    if (loadedComponent) {
      return of(loadedComponent);
    }
    return from(this.lazyControlComponents[controlType]()).pipe(
      tap(comp => this.loadedControlComponents.set(controlType, comp))
    );
  }
}
