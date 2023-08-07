import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomDialogPage } from './pages/custom-dialog/custom-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: CustomDialogPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
