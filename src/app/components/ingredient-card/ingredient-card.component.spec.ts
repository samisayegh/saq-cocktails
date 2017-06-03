import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppModule } from '../../app.module';
import { IngredientCardComponent } from './ingredient-card.component';
import { SaqService } from '../../services/saq/saq.service';

import { SaqServiceStub } from '../../../test/stubs/saq-service.stub';
import { SaqAlcoholResult } from '../../../test/saq-cocktail-test.classes';

const alcohol1 = new SaqAlcoholResult('alcohol 1', '500 ml', '100');
const alcohol2 = new SaqAlcoholResult('alcohol 2', '750 ml', '200');
const alcohol3 = new SaqAlcoholResult('alcohol 3', '1.5 L', '300');



let comp: IngredientCardComponent;
let fixture: ComponentFixture<IngredientCardComponent>;
let de: DebugElement;

const PHOTO_PATH = '../../../assets/ingredient-photos/no_image';

describe('IngredientCardComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [{provide: SaqService, useValue: new SaqServiceStub([alcohol1, alcohol2, alcohol3])}]
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
