import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';




@NgModule({
  declarations: [SettingsComponent],
  imports: [
    SettingsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})

export class SettingsModule { }