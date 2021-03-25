import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponentComponent } from './admin-component/admin-component.component';



@NgModule({
  declarations: [AdminComponentComponent],
  imports: [
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AdminModule { }
