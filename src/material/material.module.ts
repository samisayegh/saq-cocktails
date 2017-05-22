import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdButtonModule,
  MdAutocompleteModule,
  MdInputModule,
  MdOptionModule,
  MdIconModule,
  MdGridListModule,
  MdCardModule
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
    MdGridListModule,
    MdCardModule
  ],
  exports: [
    BrowserAnimationsModule,
    MdButtonModule,
    MdAutocompleteModule,
    MdInputModule,
    MdOptionModule,
    MdIconModule,
    MdGridListModule,
    MdCardModule
  ],
  providers: []
})
export class MaterialModule { }
