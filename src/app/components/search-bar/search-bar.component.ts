import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CocktailService } from '../../services/cocktail/cocktail.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit, OnDestroy {
    private cocktails: string[] = this.cocktailService.cocktails;
    private selectedCocktailSubscription: Subscription;
    query: string = null;
    filteredOptions: string[] = [];

    constructor(private cocktailService: CocktailService) {}

    ngOnInit() {
        this.selectedCocktailSubscription = this.cocktailService.selectedCocktail.subscribe(cocktail => this.query = (cocktail) ? cocktail.name : null);
    }

    ngOnDestroy() {
        this.selectedCocktailSubscription.unsubscribe();
    }

    queryUpdated(val: string) {
        this.filteredOptions = this.filter(val.toLowerCase());
    }

    filter(val: string): string[] {
        return (val) ? this.cocktails.filter(option => option.toLowerCase().indexOf(val) !== -1) : this.cocktails;
    }

    randomCocktail() {
        const numOfCocktails = this.cocktails.length - 1;
        const rand = Math.random();
        const cocktailIndex = Math.round(rand * numOfCocktails);
        const cocktailName = this.cocktails[cocktailIndex];

        (cocktailName !== this.query) ? this.selectCocktail(cocktailName) : this.randomCocktail();
    }

    selectCocktail(cocktailName: string) {
        this.cocktailService.updateSelectedCocktail(cocktailName);
    }
}
