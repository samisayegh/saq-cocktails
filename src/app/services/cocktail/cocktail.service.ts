import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { cocktails, cocktailInfos, CocktailInfo } from '../../../data/cocktail-recipes';

@Injectable()
export class CocktailService {
    cocktails: string[] = Object.keys(cocktails).map(key => cocktails[key]);
    selectedCocktail: BehaviorSubject<CocktailInfo> = new BehaviorSubject<CocktailInfo>(null);

    updateSelectedCocktail(cocktail: string) {
    	const selected = cocktailInfos[cocktail];
    	this.selectedCocktail.next(selected || null);
    }
}
