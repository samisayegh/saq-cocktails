import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CocktailService } from '../../services/cocktail/cocktail.service';
import { Recipe } from '../../../data/cocktail-recipes'
import { Func } from '../../../utils/functions';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css']
})

export class RecipeComponent implements OnInit, OnDestroy {
	cocktailSubscription: Subscription;
	recipe: Recipe;

	constructor(private cocktailService: CocktailService, private func: Func) {}
	
	ngOnInit() {
		this.cocktailSubscription = this.cocktailService.selectedCocktail.subscribe(cocktailInfo => {
			this.recipe = (cocktailInfo) ? cocktailInfo.recipe : null;
		});
	}

	ngOnDestroy() {
		this.cocktailSubscription.unsubscribe();
	}
}