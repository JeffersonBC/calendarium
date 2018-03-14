import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormSharedService } from './form/form.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    FormSharedService
  ]
})
export class SharedModule { }
