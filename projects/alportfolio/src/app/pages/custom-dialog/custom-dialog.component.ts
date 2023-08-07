import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";


@Component({
  selector: 'app-custom-dialog-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './custom-dialog.component.html',
})
export class CustomDialogPage { }
