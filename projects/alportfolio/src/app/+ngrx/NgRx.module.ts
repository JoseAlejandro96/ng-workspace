
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'projects/form-playground/src/environments/environment';
import { ProjectsStoreModule } from './+projects/projects.module';

@NgModule({
  imports: [
    StoreModule.forRoot({}), // Configuración del Store principal
    EffectsModule.forRoot([]), // Configuración de efectos globales
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ProjectsStoreModule
  ],
  exports: [StoreModule, EffectsModule, StoreDevtoolsModule], // Exporta los módulos para poder usarlos en otros módulos
})
export class NgRxModule { }
