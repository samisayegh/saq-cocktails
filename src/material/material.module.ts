import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdButtonModule,
  MdAutocompleteModule,
  MdInputModule,
  MdOptionModule
} from '@angular/material';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserAnimationsModule,
    MdButtonModule,
    MdAutocompleteModule,
    MdInputModule,
    MdOptionModule
  ],
  exports: [
    BrowserAnimationsModule,
    MdButtonModule,
    MdAutocompleteModule,
    MdInputModule,
    MdOptionModule
  ],
  providers: []
})
export class MaterialModule { }
