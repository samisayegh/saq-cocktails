import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { cocktails, cocktailInfos, CocktailInfo } from '../../../data/cocktail-recipes';

@Injectable()
export class CocktailService {
    selectedCocktail: BehaviorSubject<CocktailInfo> = new BehaviorSubject<CocktailInfo>(null);

    cocktails: string[] = Object.keys(cocktails).map(key => cocktails[key]);

    updateSelectedCocktail(cocktail: string) {
        this.selectedCocktail.next(cocktailInfos[cocktail]);
    }
}
