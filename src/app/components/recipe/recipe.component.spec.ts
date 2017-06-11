import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppModule } from '../../app.module';
import { RecipeComponent } from './recipe.component';
import { CocktailService } from '../../services/cocktail/cocktail.service';
import { alcohols, cocktails } from '../../../data/cocktail-recipes';

import { CocktailServiceStub } from '../../../test/stubs/cocktail.service.stub';
import { SaqAlcoholResult } from '../../../test/saq-cocktail-test.classes';

const alcohol1 = new SaqAlcoholResult('alcohol1');
const selectedAlcohols = {
    [alcohols.WHITE_RUM]: <Type.Result>alcohol1
};



let comp: RecipeComponent;
let fixture: ComponentFixture<RecipeComponent>;
let de: DebugElement;
let cocktailService: CocktailService;

describe('RecipeComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ AppModule ],
            providers: [{provide: CocktailService, useValue: new CocktailServiceStub([cocktails.MOJITO])}]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecipeComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        cocktailService = TestBed.get(CocktailService);

        // set the recipe
        cocktailService.updateSelectedCocktail(cocktails.MOJITO);
        fixture.detectChanges();

        // set the Saq results
        comp.selectedAlcohols = selectedAlcohols;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(comp).toBeTruthy();
    });

    it('should display a card for every ingredient', () => {
        const ingredientCardDe: DebugElement[] = de.queryAll(By.css('app-ingredient-card'));
        const recipe = comp.cocktailInfo.recipe;

        expect(ingredientCardDe.length).toEqual(recipe.alcohols.length + recipe.other.length);
    });

    it('should display an \'instructions\' and \'summary\' InfoCardComponents', () => {
        const infoCardDe: DebugElement[] = de.queryAll(By.css('app-info-card'));

        expect(infoCardDe.length).toEqual(2);
    });

    it('should calculate the total price of all the selected alcohols', () => {
        const bottlePrice = alcohol1.raw.tpprixnum;

        expect(comp.totalAlcoholPrice).toEqual(bottlePrice);
    });

    it('should calculate the number of cockails that can be made', () => {
        expect(comp.numberOfCocktails).toEqual(12);
    });

    it('should calculate the cost per cocktail', () => {
        expect(comp.costPerCocktail).toEqual(7.89);
    });
});
