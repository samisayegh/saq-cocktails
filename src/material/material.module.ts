import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdButtonModule,
  MdAutocompleteModule,
  MdInputModule,
  MdOptionModule,
  MdIconModule,
  MdGridListModule
} from '@angular/material';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserAnimationsModule,
    MdButtonModule,
    MdAutocompleteModule,
    MdInputModule,
    MdOptionModule,
    MdIconModule,
    MdGridListModule
  ],
  exports: [
    BrowserAnimationsModule,
    MdButtonModule,
    MdAutocompleteModule,
    MdInputModule,
    MdOptionModule,
    MdIconModule,
    MdGridListModule
  ],
  providers: []
})
export class MaterialModule { }
