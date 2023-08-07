import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogRef, DialogService } from 'components';
import { IdentifymeDialogComponent } from './identifyme-dialog/identifyme-dialog.component';

@Component({
  selector: 'app-custom-dialog-page',
  standalone: true,
  imports: [CommonModule],
  providers: [DialogService],
  templateUrl: './custom-dialog.component.html',
})
export class CustomDialogPage {

  private dialogRef: DialogRef | undefined;

  constructor(private readonly dialogService: DialogService) {
  }

  openDialog() {
    this.dialogRef = this.dialogService.open(IdentifymeDialogComponent);
  }
}
