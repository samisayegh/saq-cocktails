import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CocktailInfo } from '../../../data/cocktail-recipes';
import { CocktailService } from '../../services/cocktail/cocktail.service';
import { Maths } from '../../../utils/maths';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css']
})

export class RecipeComponent implements OnInit, OnDestroy {
    cocktailSubscription: Subscription;
    cocktailInfo: CocktailInfo;
    selectedAlcohols: {[key: string]: Type.Result} = {}

    constructor(private cocktailService: CocktailService) {}

    ngOnInit() {
        this.cocktailSubscription = this.cocktailService.selectedCocktail.subscribe(cocktailInfo => {
            this.cocktailInfo = cocktailInfo;
            this.selectedAlcohols = {};
        });
    }

    ngOnDestroy() {
        this.cocktailSubscription.unsubscribe();
    }

    // aggregates selected alcohols from all alcohol ingredient-card components
    updateSelectedAlcohols(alcohol: Type.SelectedAlcohol) {
        this.selectedAlcohols[alcohol.name] = alcohol.selected;
    }

    alcoholPriceTotal(): string {
        let total = 0;

        for(const key in this.selectedAlcohols) {
            const selected = this.selectedAlcohols[key];
            if (selected) {
                total += selected.raw.tpprixnum;
            }
        }

        return `Total cost of your alcohol selections is $${Maths.formatDecimalPrice(total)}`;
    }
}
