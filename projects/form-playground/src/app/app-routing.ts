import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Template-Driven Forms Playground',
    loadComponent:
      () => import('./playground/template-forms/template-forms-page/template-forms-page.component')
        .then(m => m.TemplateFormsPageComponent)
  },
  {
    path: 'reactive-forms',
    title: 'Reactive Forms Playground',
    loadComponent:
      () => import('./playground/reactive-forms/reactive-forms-page/reactive-forms-page.component')
        .then(m => m.ReactiveFormsPageComponent)
  },
  {
    path: 'custom-rating-picker',
    title: 'Custom Rating Picker Playground',
    loadComponent: () => import('./playground/custom-rating-picker/rating-picker-page/rating-picker-page.component')
      .then(m => m.RatingPickerPageComponent)
  },
  {
    path: 'custom-select',
    title: 'Custom Select Component Playground (Advanced)',
    loadComponent: () => import('./playground/custom-select/custom-select-page/custom-select-page.component')
      .then(m => m.CustomSelectPageComponent)
  },
  {
    path: 'dynamic-forms',
    title: 'Dynamic forms Playground',
    loadComponent: () => import('./playground/dynamic-forms/dynamic-forms-page/dynamic-forms-page.component')
      .then(m => m.DynamicFormsPageComponent)
  },
  {
    path: 'ngrx-practive',
    title: 'NgRx Practice',
    loadComponent: () => import('./practice/ngrx-practice/ngrx-practice.component')
      .then(m => m.NgRxPracticeComponent)
  },
];
