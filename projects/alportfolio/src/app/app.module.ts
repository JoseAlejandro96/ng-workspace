import { DialogModule } from '@angular/cdk/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent, ButtonComponent, ChipComponent, NavbarComponent } from 'components';
import { NgRxModule } from './+ngrx/NgRx.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomDialogPage } from './pages/custom-dialog/custom-dialog.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgRxModule,

    ChipComponent,
    ButtonComponent,
    BannerComponent,
    NavbarComponent,

    FormsModule,
    DialogModule,

    CustomDialogPage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
