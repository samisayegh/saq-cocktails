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
    selectedAlcohols: {[key: string]: Type.Result} = {};

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

    get totalBottlePrice(): number {
        let total = 0;

        Object.keys(this.selectedAlcohols).forEach(key => {
            const selected = this.selectedAlcohols[key];

            if (selected) {
                total += selected.raw.tpprixnum;
            }
        });

        return total;
    }

    // determines the smallest SAQ bottle volume relative to recipe requirements and the number of cocktails that can be made.
    get numberOfCocktails(): number {
        // dividing SAQ bottle volumes by cocktail recipe volumes
        const normalizedAlcoholVolumes = this.selectedAlcoholVolumes().map(alcohol => {
            const alcoholIngredient = this.cocktailInfo.getAlcoholIngredient(alcohol.name);

            if (alcoholIngredient) {
                alcohol.vol /= <number>alcoholIngredient.quantity;
                return alcohol;
            }

            return null;
        })
        .filter(alcohol => alcohol !== null);

        // sort in ascending order. First element will be the limiting alcohol in the cocktail recipe.
        const limitingAlcohol = normalizedAlcoholVolumes.sort((a, b) => (a.vol > b.vol) ? 1 : -1).shift();

        return (limitingAlcohol) ? Math.floor(limitingAlcohol.vol) : -1;
    }

    // sums the costs of all alcohol ingredients needed for the cocktail.
    get costPerCocktail(): number {
        const costOfAlcoholIngredients = this.selectedAlcoholVolumes().map(alcohol => {
            const alcoholIngredient = this.cocktailInfo.getAlcoholIngredient(alcohol.name);

            if (alcoholIngredient) {
                // fraction of bottle needed for the cocktail recipe
                const alcoholBottleFraction = <number>alcoholIngredient.quantity / alcohol.vol;
                const bottlePrice = this.selectedAlcohols[alcohol.name].raw.tpprixnum;
                return alcoholBottleFraction * bottlePrice;
            }

            return null;

        })
        .filter(alcoholCost => !isNaN(alcoholCost));

        // add all numbers in the array and return total
        const totalCost = costOfAlcoholIngredients.reduce((a, b) => a + b, 0);

        return (typeof totalCost === 'number') ? Maths.twoDecimalPlaces(totalCost) : -1;
    }

    // returns object array of selected alcohol names and volumes in ounces
    private selectedAlcoholVolumes(): Type.AlcoholVolume[] {
        const volumes: Type.AlcoholVolume[] = [];

        Object.keys(this.selectedAlcohols).forEach(key => {
            const selected = this.selectedAlcohols[key];

            if (selected) {
                const vol = selected.raw.tpformat;
                const ounces = Maths.convertLitresToOunces(vol);

                if (ounces !== -1) {
                    volumes.push({name: key, vol: ounces});
                }
            }
        });

        return volumes;
    }

    // aggregates selected alcohols from all alcohol ingredient-card components
    updateSelectedAlcohols(alcohol: Type.SelectedAlcohol) {
        this.selectedAlcohols[alcohol.name] = alcohol.selected;
    }

    private priceTotalString(): string {
        return `Total cost of your alcohol selections is $${Maths.formatAsPrice(this.totalBottlePrice)}`;
    }

    private noOfCocktailsString(): string {
        const numOfCocktails = this.numberOfCocktails;
        return (numOfCocktails !== -1) ? `You will be able to make ${numOfCocktails} ${this.cocktailInfo.name}s!` : null;
    }

    private costPerCocktailString(): string {
        const cost = this.costPerCocktail;
        return (cost !== -1) ? `That is a cost of $${Maths.formatAsPrice(cost)} per cocktail!` : null;
    }
}
