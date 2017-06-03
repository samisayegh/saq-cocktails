import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppModule } from '../../app.module';
import { SearchBarComponent } from './search-bar.component';
import { CocktailService } from '../../services/cocktail/cocktail.service';
import { cocktails } from '../../../data/cocktail-recipes';

import { CocktailServiceStub } from '../../../test/stubs/cocktail-service.stub';



let comp: SearchBarComponent;
let fixture: ComponentFixture<SearchBarComponent>;
let de: DebugElement;
let cocktailService: CocktailService;

describe('SearchBarComponent', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [{provide: CocktailService, useValue: new CocktailServiceStub([cocktails.MOJITO])}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;

    cocktailService = TestBed.get(CocktailService);
    fixture.detectChanges();
  });

  it('should create a search bar', async(() => {
    expect(de.componentInstance).toBeTruthy();
  }));


  it('filters cocktails to match a query', () => {
    fixture.whenStable().then(() => {
      expect(comp.filteredOptions.length).toEqual(0);

      const query = 'moj';
      const inputEl: HTMLInputElement = de.query(By.css('input')).nativeElement;
      inputEl.value = query;
      inputEl.dispatchEvent(new Event('input'));

      expect(comp.query).toBe(query);
      expect(comp.filteredOptions.length).toEqual(1);
    });
  });

  it('populates the search bar with the value of the selected cocktail', () => {
    cocktailService.updateSelectedCocktail(cocktails.MOJITO);
    fixture.detectChanges();
    const inputEl: HTMLInputElement = de.query(By.css('input')).nativeElement;

    expect(comp.query).toBe(cocktails.MOJITO);
    expect(inputEl.getAttribute('ng-reflect-model')).toBe(cocktails.MOJITO);
  });

  it('populates the searchbar when clicking the "surpise me" button', () => {
    const inputEl: HTMLInputElement = de.query(By.css('input')).nativeElement;
    const surpiseMeButtonEl: HTMLButtonElement = de.query(By.css('button')).nativeElement;

    expect(comp.query).toBeNull();
    expect(inputEl.getAttribute('ng-reflect-model')).toBeNull();

    surpiseMeButtonEl.click();
    fixture.detectChanges();

    expect(comp.query).toBeTruthy();
    expect(inputEl.getAttribute('ng-reflect-model')).toBeTruthy();
  });
});
