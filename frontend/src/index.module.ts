import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    IndexRoutingModule
  ],
  declarations: [
    IndexComponent
  ]
})

export class IndexModule { }
