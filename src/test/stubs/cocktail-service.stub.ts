import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { cocktails, cocktailInfos } from '../../data/cocktail-recipes';

export class CocktailServiceStub {
    cocktails = [];
    selectedCocktail = new BehaviorSubject(null);

    constructor(cocktailOptions: string[]) {
        this.cocktails = cocktailOptions;
    }

    updateSelectedCocktail = (cocktailName: string) => {
        this.selectedCocktail.next(cocktailInfos[cocktailName]);
    }
};
