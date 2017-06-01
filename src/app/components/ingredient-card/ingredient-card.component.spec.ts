import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppModule } from '../../app.module';
import { IngredientCardComponent } from './ingredient-card.component';

describe('IngredientCardComponent', () => {
  let comp: IngredientCardComponent;
  let fixture: ComponentFixture<IngredientCardComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientCardComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;

    // cocktailService = TestBed.get(CocktailService);
    fixture.detectChanges();
  });

  it('should create an ingredient card', () => {
    expect(comp).toBeTruthy();
  });
});
