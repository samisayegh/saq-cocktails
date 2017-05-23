import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// includes all material design elements
import { MaterialModule } from '../material/material.module';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';

import { CocktailService } from './services/cocktail/cocktail.service';
import { SaqService } from './services/saq/saq.service';

import { Func } from '../utils/functions';
import { Maths } from '../utils/maths';

// Rxjs operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    RecipeComponent,
    IngredientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [
    CocktailService,
    SaqService,
    Func,
    Maths
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
