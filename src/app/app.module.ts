import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// includes all material design elements
import { MaterialModule } from '../material/material.module';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { IngredientCardComponent } from './components/ingredient-card/ingredient-card.component';
import { InfoCardComponent } from './components/info-card/info-card.component';

import { CocktailService } from './services/cocktail/cocktail.service';

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
    IngredientCardComponent,
    InfoCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [
    CocktailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
